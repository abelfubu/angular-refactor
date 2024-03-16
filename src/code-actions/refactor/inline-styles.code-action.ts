import { CodeActionKind, Range, TextDocument } from 'vscode';
import { CodeActionDefinition } from '../../models/code-action-definition.model';
import { Command } from '../../models/command.enum';

export const inlineStylesCodeAction: CodeActionDefinition = {
  selector: {
    language: 'typescript',
    scheme: 'file',
    pattern: '**/*.component.ts',
  },
  provider: {
    provideCodeActions: async (document: TextDocument, range: Range) => {
      if (!range.isSingleLine) {
        return;
      }

      const line = document.lineAt(range.start.line);

      if (
        ['styleUrl: ', 'styleUrls: ', 'styles: '].some((v) =>
          line.text.includes(v),
        )
      ) {
        return [
          {
            command: Command.ToggleInlineStyles,
            kind: CodeActionKind.RefactorInline,
            title: 'Toggle inline styles',
            tooltip: 'Toggle inline styles',
          },
        ];
      }
    },
  },
};
