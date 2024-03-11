import {
  capitalize,
  classify,
  dasherize,
} from '@angular-devkit/core/src/utils/strings';
import { basename, dirname } from 'path';
import { NewLineKind, Project, SyntaxKind } from 'ts-morph';
import { window, workspace } from 'vscode';
import { Guard } from '../../guards/guard';
import { ConstructWithSelector } from '../../models/construct-with-selector.type';
import { ConstructType } from '../../models/construct.type';
import { findAndReplace } from '../../utils/file-system/find-and-replace.util';
import { getWorkspaceFolder } from '../../utils/file-system/get-workspace-folder.util';
import { readFilePath } from '../../utils/file-system/read-file-path.util';
import { renameFilesInFolder } from '../../utils/file-system/rename-files-in-folder.util';
import { getDecoratorMetadata } from '../../utils/typescript/get-decorator-metadata.util';
import { getObjectProperty } from '../../utils/typescript/get-object-property.util';
import { udpateFileImportsInComponentMetadata } from '../../utils/typescript/udpate-file-imports-in-component-metadata.util';
import { findAndReplaceInComponentInlineTemplate } from '../template/find-and-replace-in-component-inline-template';
import { getConstructPropertySelector } from './construct-property-map';
import { metadataHanderFactory } from './metadata-hander.factory';

export async function renamer(constructType: ConstructWithSelector) {
  Guard.notAngularWorkspace();

  const workspacePath = getWorkspaceFolder()?.fsPath;
  const documentPath = (await readFilePath()).fsPath;

  // Wether it has a decorator selector or name (pipes)
  const selectorType = getConstructPropertySelector(constructType);

  Guard.notNullOrEmpty(documentPath, 'No active editor found');
  Guard.notNullOrEmpty(workspacePath, 'No active workspace found');

  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(documentPath);

  // Get the class name (pipe, component, directive)
  const construct = sourceFile.getFirstDescendantByKind(
    SyntaxKind.ClassDeclaration,
  );

  Guard.notNullOrEmpty(
    construct,
    `${capitalize(constructType)} class not found`,
  );

  const decorator = construct.getDecorator(capitalize(constructType));

  Guard.notNullOrEmpty(
    decorator,
    `${capitalize(constructType)} decorator not found`,
  );

  // The object inside the decorators with all it's config
  const metadata = getDecoratorMetadata(decorator);

  const metadataProperty = getObjectProperty(
    metadata,
    selectorType,
    SyntaxKind.StringLiteral,
  );

  const oldProperty = metadataProperty?.getLiteralValue();

  Guard.notNullOrEmpty(
    oldProperty,
    `${capitalize(constructType)} ${selectorType} not found`,
  );

  const newFileName = await window.showInputBox({
    prompt: `Enter new ${constructType} name`,
    value: basename(documentPath).split('.')[0],
  });

  Guard.notNullOrEmpty(
    newFileName,
    `${capitalize(constructType)} name is required`,
  );

  const nameWithoutExtension = newFileName.split('.').at(0);
  const cleanFileName = dasherize(String(nameWithoutExtension));

  const metadataHandler = metadataHanderFactory(constructType);
  const { metadataValue, findAndReplaceValue, regex } = metadataHandler(
    oldProperty,
    cleanFileName,
  );

  // Updates the value of the (selector | name) with the new name
  metadataProperty?.setLiteralValue(metadataValue);

  // Finds all ts and html files in the workspace
  const fileUris = await workspace.findFiles(
    '**/*.{ts,html}',
    '**/node_modules/**',
    10000,
  );

  for (const uri of fileUris) {
    if (uri.fsPath.endsWith('spec.ts') || uri.fsPath.endsWith('.html')) {
      // Just a simple find and replace with a regex
      await findAndReplace(uri, regex, findAndReplaceValue);
      continue;
    }

    // We get the inline template and do the find and replace
    await findAndReplaceInComponentInlineTemplate({
      uri,
      project,
      regExp: regex,
      replacer: findAndReplaceValue,
    });
  }

  /**
   * Renaming all possible files in the folder
   *
   * When renaming with the vscode API the old files are automatically closed
   * and the new files are focused.
   *
   * That's why it's being renamed twice, one time here and one time with
   * ts-morph so that we can have imports and references renamed too
   */
  await renameFilesInFolder({
    extensions: ['ts', 'scss', 'html', 'spec.ts', 'css'],
    mainTsFile: documentPath,
    newName: cleanFileName,
    constructType,
  });

  if (constructType === ConstructType.Component) {
    udpateFileImportsInComponentMetadata(
      metadata,
      cleanFileName,
      constructType,
    );
  }

  /**
   * Rename the class name adding the whole project so that ts-morph can do
   * all the heavy work for us renaming references and file imports
   * */
  project.addSourceFilesAtPaths(`${workspacePath}/src/**/*.ts`);
  construct.rename(`${classify(cleanFileName)}${classify(constructType)}`, {
    renameInComments: true,
    renameInStrings: true,
  });

  sourceFile.move(
    `${dirname(sourceFile.getFilePath())}/${cleanFileName}.${constructType}.ts`,
    { overwrite: true },
  );

  project.getSourceFiles().forEach(async (sourceFile) => {
    if (sourceFile.compilerNode.endOfFileToken.getFullText()[0] !== '\n') {
      project.manipulationSettings.set({ newLineKind: NewLineKind.LineFeed });
    } else {
      project.manipulationSettings.set({
        newLineKind: NewLineKind.CarriageReturnLineFeed,
      });
    }

    await sourceFile.save();
    project.removeSourceFile(sourceFile);
  });

  window.showInformationMessage(
    `${classify(constructType)} '${basename(
      documentPath.split('.')[0],
    )}' successfully renamed to '${cleanFileName}'.`,
  );
}
