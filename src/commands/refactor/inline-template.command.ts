import { window } from 'vscode';
import { Guard } from '../../guards/guard';
import { CommandDefinition } from '../../models/command-definition.model';
import { Command } from '../../models/command.enum';
import { templateTogglerFactory } from '../../tools/template/tempate-toggler.factory';
import { isComponentTsFile } from '../../utils/regex/is-component-ts-file.util';

export const toggleInlineTemplateCommand: CommandDefinition = {
  id: Command.ToggleInlineTemplate,
  execute: async () => {
    Guard.notAngularWorkspace(() =>
      window.showErrorMessage('Not an Angular workspace'),
    );

    const document = window.activeTextEditor?.document;

    Guard.notNullOrEmpty(document, () =>
      window.showErrorMessage('No active editor found'),
    );

    Guard.notNullOrEmpty(isComponentTsFile(document.fileName), () =>
      window.showErrorMessage('No component found'),
    );

    const toggler = templateTogglerFactory(document.getText());

    Guard.notNullOrEmpty(toggler, () =>
      window.showErrorMessage('No template found'),
    );

    toggler.toggle(document);
  },
};
