import { Guard } from '@guards/guard';
import { CommandDefinition } from '@models/command-definition.model';
import { Command } from '@models/command.enum';
import { templateTogglerFactory } from '@tools/template/tempate-toggler.factory';
import { window } from 'vscode';

export const toggleInlineTemplateCommand: CommandDefinition = {
  id: Command.ToggleInlineTemplate,
  progressTitle: 'Toggling inline template...',
  execute: async () => {
    Guard.notAngularWorkspace();

    const document = window.activeTextEditor?.document;

    Guard.notNullOrEmpty(document, 'No active editor found');

    const toggler = templateTogglerFactory(document.getText());

    Guard.notNullOrEmpty(toggler, 'No template found');

    toggler.toggle(document);
  },
};
