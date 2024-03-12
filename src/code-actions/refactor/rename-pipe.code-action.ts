import { Range, TextDocument } from 'vscode';
import { CodeActionDefinition } from '../../models/code-action-definition.model';
import { Command } from '../../models/command.enum';

export const renamePipeCodeAction: CodeActionDefinition = {
  selector: {
    language: 'typescript',
    scheme: 'file',
    pattern: '**/*.pipe.ts',
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
            command: Command.RenamePipe,
            title: 'Rename Angular Pipe',
            tooltip: 'Rename Angular Pipe',
          },
        ];
      }
    },
  },
};
