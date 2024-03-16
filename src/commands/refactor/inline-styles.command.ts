import { Guard } from '@guards/guard';
import { CommandDefinition } from '@models/command-definition.model';
import { Command } from '@models/command.enum';
import { stylesTogglerFactory } from '@tools/styles/styles-toggler.factory';
import { getActiveDocument } from '@utils/file-system/get-active-document.util';

export const toggleInlineStylesCommand: CommandDefinition = {
  id: Command.ToggleInlineStyles,
  progressTitle: 'Toggling inline styles...',
  execute: async () => {
    Guard.notAngularWorkspace();

    const document = getActiveDocument();

    Guard.notNullOrEmpty(document, 'No active editor found');

    const toggler = stylesTogglerFactory(document.getText());

    Guard.notNullOrEmpty(toggler, 'No styles found');

    toggler.toggle(document);
  },
};
