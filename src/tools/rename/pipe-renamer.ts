import { camelize, dasherize } from '@angular-devkit/core/src/utils/strings';
import { basename } from 'path';
import { ObjectLiteralExpression, Project, SyntaxKind } from 'ts-morph';
import { window, workspace } from 'vscode';
import { Guard } from '../../guards/guard';
import { ConstructType } from '../../models/construct.type';
import { AngularDecoratorMetadata } from '../../utils/angular/angular-decorator-metadata.model';
import { findAndReplace } from '../../utils/file-system/find-and-replace.util';
import { renameFilesInFolder } from '../../utils/file-system/rename-files-in-folder.util';
import { getObjectProperty } from '../../utils/typescript/get-object-property.util';
import { AngularJsonProjectInfo } from '../angularjson/get-angular-json-project-info';
import { findAndReplaceInComponentInlineTemplate } from '../template/find-and-replace-in-component-inline-template';
import { Renamer } from './renamer.model';

export function pipeRenamer(): Renamer {
  return {
    rename: async (
      project: Project,
      documentPath: string,
      metadata: ObjectLiteralExpression,
      _angularJson: AngularJsonProjectInfo,
    ) => {
      const metadataProperty = getObjectProperty(
        metadata,
        AngularDecoratorMetadata.Name,
        SyntaxKind.StringLiteral,
      );

      const oldName = metadataProperty?.getLiteralValue();

      Guard.notNullOrEmpty(oldName, 'Pipe selector not found');

      const newFileName = await window.showInputBox({
        prompt: 'Enter new pipe name',
        value: basename(documentPath).split('.')[0],
      });

      Guard.notNullOrEmpty(newFileName, 'Pipe name is required');

      const nameWithoutExtension = newFileName.split('.').at(0);

      const filename = dasherize(String(nameWithoutExtension));
      const replacer = camelize(filename);

      const metadataValue = replacer;
      const regex = new RegExp(`\\b${oldName}\\b`, 'g');

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
          await findAndReplace(uri, regex, replacer);
          continue;
        }

        // We get the inline template and do the find and replace
        await findAndReplaceInComponentInlineTemplate({
          uri,
          project,
          replacer,
          regExp: regex,
        });
      }

      await renameFilesInFolder({
        extensions: ['ts', 'spec.ts'],
        mainTsFile: documentPath,
        newName: filename,
        constructType: ConstructType.Pipe,
      });

      return filename;
    },
  };
}
