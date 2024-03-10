import { window } from 'vscode';
import { Guard } from '../../guards/guard';
import { CommandDefinition } from '../../models/command-definition.model';
import { Command } from '../../models/command.enum';
import { templateTogglerFactory } from '../../tools/template/tempate-toggler.factory';

export const toggleInlineTemplateCommand: CommandDefinition = {
  id: Command.ToggleInlineTemplate,
  execute: async () => {
    Guard.notAngularWorkspace();

    const document = window.activeTextEditor?.document;

    Guard.notNullOrEmpty(document, 'No active editor found');

    const toggler = templateTogglerFactory(document.getText());

    Guard.notNullOrEmpty(toggler, 'No template found');

    toggler.toggle(document);
  },
};
