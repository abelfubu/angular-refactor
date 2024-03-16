import { CodeActionKind, Range, TextDocument } from 'vscode';
import { CodeActionDefinition } from '../../models/code-action-definition.model';
import { Command } from '../../models/command.enum';

export const renameComponentCodeAction: CodeActionDefinition = {
  selector: {
    language: 'typescript',
    scheme: 'file',
    pattern: '**/*.component.ts',
  },
  provider: {
    provideCodeActions(document: TextDocument, range: Range) {
      if (!range.isSingleLine) {
        return;
      }

      const line = document.lineAt(range.start.line);

      if (line.text.includes('export class')) {
        return [
          {
            command: Command.RenameComponent,
            kind: CodeActionKind.Refactor,
            title: 'Rename Angular Component',
            tooltip: 'Rename Angular Component',
          },
        ];
      }
    },
  },
};
