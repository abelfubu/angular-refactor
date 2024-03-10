import { Range, TextDocument } from 'vscode';
import { CodeActionDefinition } from '../../models/code-action-definition.model';
import { Command } from '../../models/command.enum';

export const inlineTemplateCodeAction: CodeActionDefinition = {
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

      if (['template: ', 'templateUrl: '].some((v) => line.text.includes(v))) {
        return [
          {
            command: Command.ToggleInlineTemplate,
            title: 'Toggle inline html',
            tooltip: 'Toggle inline html',
          },
        ];
      }
    },
  },
};
