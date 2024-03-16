import { CodeActionKind, Range, TextDocument } from 'vscode';
import { CodeActionDefinition } from '../../models/code-action-definition.model';
import { Command } from '../../models/command.enum';

export const renameDirectiveCodeAction: CodeActionDefinition = {
  selector: {
    language: 'typescript',
    scheme: 'file',
    pattern: '**/*.directive.ts',
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
            command: Command.RenameDirective,
            kind: CodeActionKind.Refactor,
            title: 'Rename Angular Directive',
            tooltip: 'Rename Angular Directive',
          },
        ];
      }
    },
  },
};
