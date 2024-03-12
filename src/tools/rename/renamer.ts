import { capitalize, classify } from '@angular-devkit/core/src/utils/strings';
import { basename, dirname } from 'path';
import { Project, SyntaxKind } from 'ts-morph';
import { window } from 'vscode';
import { Guard } from '../../guards/guard';
import { ConstructWithSelector } from '../../models/construct-with-selector.type';
import { getWorkspaceFolder } from '../../utils/file-system/get-workspace-folder.util';
import { readFilePath } from '../../utils/file-system/read-file-path.util';
import { getDecoratorMetadata } from '../../utils/typescript/get-decorator-metadata.util';
import { saveProject } from '../../utils/typescript/save-project.util';
import { getAngularJsonProjectInfo } from '../angularjson/get-angular-json-project-info';
import { renamerFactory } from './renamer-factory';

export async function renamer(constructType: ConstructWithSelector) {
  Guard.notAngularWorkspace();

  const workspacePath = getWorkspaceFolder()?.fsPath;
  const documentUri = await readFilePath();
  const documentPath = documentUri.fsPath;
  const angularJson = await getAngularJsonProjectInfo(documentUri);

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

  const renamer = renamerFactory(constructType);

  const filename = await renamer.rename(
    project,
    documentPath,
    metadata,
    angularJson,
  );

  construct.rename(`${classify(filename)}${classify(constructType)}`, {
    renameInComments: true,
    renameInStrings: true,
  });

  sourceFile.move(
    `${dirname(sourceFile.getFilePath())}/${filename}.${constructType}.ts`,
    { overwrite: true },
  );

  await saveProject(project);

  window.showInformationMessage(
    `${classify(constructType)} '${basename(
      documentPath.split('.')[0],
    )}' successfully renamed to '${filename}'.`,
  );
}
