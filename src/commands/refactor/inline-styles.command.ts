import { window } from 'vscode';
import { Guard } from '../../guards/guard';
import { CommandDefinition } from '../../models/command-definition.model';
import { Command } from '../../models/command.enum';
import { stylesTogglerFactory } from '../../tools/styles/styles-toggler.factory';
import { isComponentTsFile } from '../../utils/regex/is-component-ts-file.util';

export const toggleInlineStylesCommand: CommandDefinition = {
  id: Command.ToggleInlineStyles,
  progressTitle: 'Toggling inline styles...',
  execute: async () => {
    Guard.notAngularWorkspace();

    const document = window.activeTextEditor?.document;

    Guard.notNullOrEmpty(document, 'No active editor found');

    Guard.notNullOrEmpty(
      isComponentTsFile(document.fileName),
      'No component found',
    );

    const toggler = stylesTogglerFactory(document.getText());

    Guard.notNullOrEmpty(toggler, 'No template found');

    toggler.toggle(document);
  },
};
