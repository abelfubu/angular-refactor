import { window } from 'vscode';
import { Guard } from '../../guards/guard';
import { CommandDefinition } from '../../models/command-definition.model';
import { Command } from '../../models/command.enum';
import { stylesTogglerFactory } from '../../tools/styles/styles-toggler.factory';
import { isComponentTsFile } from '../../utils/regex/is-component-ts-file.util';

export const toggleInlineStylesCommand: CommandDefinition = {
  id: Command.ToggleInlineStyles,
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

    try {
      const toggler = stylesTogglerFactory(document.getText());
      console.log(toggler);
      Guard.notNullOrEmpty(toggler, () =>
        window.showErrorMessage('No template found'),
      );
      toggler.toggle(document);
    } catch (error) {
      console.log(error);
    }
  },
};
