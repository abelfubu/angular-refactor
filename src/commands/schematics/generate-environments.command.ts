import { window } from 'vscode';
import { Guard } from '../../guards/guard';
import { CommandDefinition } from '../../models/command-definition.model';
import { Command } from '../../models/command.enum';
import { SchematicType } from '../../models/schematic.type';
import { generate } from '../../utils/terminal/generate.util';

export const generateEnvironmentsCommand: CommandDefinition = {
  id: Command.GenerateEnvironments,
  execute: async () => {
    Guard.notAngularWorkspace(window.showErrorMessage);

    return generate({
      type: SchematicType.Environments,
      command: `ng g ${SchematicType.Environments}`,
    });
  },
};
