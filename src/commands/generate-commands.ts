import { existsSync } from 'fs';
import path, { basename, dirname, join } from 'path';
import { ClassDeclaration, Project, SyntaxKind } from 'ts-morph';
import * as vscode from 'vscode';
import { ExtensionContext, commands } from 'vscode';
import { Guard } from '../guards/guard';
import * as refactorCommands from './refactor';
import * as schematicCommands from './schematics';

const newCommands = {
  rename: {
    id: 'angular-refactor.rename',
    execute: async () => {
      const editor = vscode.window.activeTextEditor;

      Guard.notNullOrEmpty(editor, () => {
        vscode.window.showErrorMessage('No active editor found');
      });

      const document = editor.document;
      const oldSelector = 'app-something';
      const newSelector = 'app-something-new';

      // Step 1: Update TypeScript files
      await updateTypescriptSelectors(
        document.uri.fsPath,
        oldSelector,
        newSelector,
      );

      // Step 2: Update HTML templates
      // await updateHtmlSelectors(document.uri.fsPath, oldSelector, newSelector);

      // Optionally, you can perform additional tasks or notify the user
      vscode.window.showInformationMessage(
        `Selector '${oldSelector}' successfully renamed to '${newSelector}'.`,
      );
    },
  },
};

export function generateCommands(context: ExtensionContext): void {
  Object.values({
    ...newCommands,
    ...schematicCommands,
    ...refactorCommands,
  }).forEach(({ id, execute }) =>
    context.subscriptions.push(commands.registerCommand(id, execute)),
  );
}

async function updateTypescriptSelectors(
  filePath: string,
  oldSelector: string,
  newSelector: string,
) {
  // renameFiles(filePath, `some-patata-component`);

  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(filePath);
  const classDeclaration = sourceFile.getFirstDescendantByKind(
    SyntaxKind.ClassDeclaration,
  );
  return;
  const files = await vscode.workspace.findFiles(
    '**/*.{ts,html}',
    '**/node_modules/**',
  );

  files.forEach(async (file) => {
    if (file.fsPath.endsWith('.html')) {
      const document = await vscode.workspace.fs.readFile(file);
      const updatedText = document
        .toString()
        .replace(new RegExp(`\\b${oldSelector}\\b`, 'g'), newSelector);
      await vscode.workspace.fs.writeFile(
        vscode.Uri.file(file.fsPath),
        Buffer.from(updatedText),
      );
      return;
    }

    const project = new Project();
    const sourceFile = project.addSourceFileAtPath(file.fsPath);
    sourceFile
      .getClasses()
      .forEach(async (classDeclaration: ClassDeclaration) => {
        const decorator = classDeclaration.getDecorator('Component');

        if (!decorator) {
          return;
        }

        const selectorProperty = decorator
          .getArguments()[0]
          .asKindOrThrow(SyntaxKind.ObjectLiteralExpression);

        const selectorValue = selectorProperty
          .getProperty('template')
          ?.getLastChildByKind(SyntaxKind.NoSubstitutionTemplateLiteral);

        const inlineTemplate = selectorValue?.getLiteralValue();
        console.log(inlineTemplate);

        if (!inlineTemplate || !selectorValue) {
          return;
        }

        console.log(inlineTemplate);

        const updatedText = inlineTemplate.replace(
          new RegExp(`\\b${oldSelector}\\b`, 'g'),
          newSelector,
        );

        selectorValue.setLiteralValue(updatedText);
        await sourceFile.save();
      });
  });

  // Find and update component selectors in TypeScript file
  sourceFile.getClasses().forEach((classDeclaration: ClassDeclaration) => {
    const references = classDeclaration.findReferences();
    console.log('[REFERENCES]', references);
    const componentDecorator = classDeclaration.getDecorator('Component');

    if (componentDecorator) {
      const selectorProperty = componentDecorator
        .getArguments()[0]
        .asKindOrThrow(SyntaxKind.ObjectLiteralExpression);

      const selectorValue = selectorProperty
        .getProperty('selector')
        ?.getLastChildByKind(SyntaxKind.StringLiteral);

      selectorValue?.setLiteralValue(newSelector);
    }
  });

  // Save the changes to the TypeScript file
  await sourceFile.save();

  // rename file and all siblings of the component {scss,spec.ts,html}
  const componentFiles = vscode.workspace.findFiles(path.dirname(filePath));
}

async function renameFiles(oldName: string, newName: string) {
  const fileExtensions = ['ts', 'scss', 'html', 'spec.ts'];
  const directory = dirname(oldName);
  console.log('[dir]', directory);
  const file = basename(oldName);
  console.log('[file]', file);

  for (const extension of fileExtensions) {
    try {
      // Rename the file
      const oldFile = join(directory, file.replace('ts', extension));
      if (!existsSync(oldFile)) continue;

      const newFile = join(directory, `${newName}.${extension}`);
      console.log({ oldFile, newFile });

      await vscode.workspace.fs.rename(
        vscode.Uri.file(oldFile),
        vscode.Uri.file(newFile),
      );
      // renameSync(oldFile, newFile);
    } catch (error) {
      console.error(`Error renaming file: ${error}`);
    }
  }

  // await vscode.workspace.openTextDocument(
  //   path.join(directory, `${newName}.ts`),
  // );
}
