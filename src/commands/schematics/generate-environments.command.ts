import { Guard } from '../../guards/guard';
import { CommandDefinition } from '../../models/command-definition.model';
import { Command } from '../../models/command.enum';
import { ConstructType } from '../../models/construct.type';
import { generate } from '../../utils/terminal/generate.util';

export const generateEnvironmentsCommand: CommandDefinition = {
  id: Command.GenerateEnvironments,
  execute: async () => {
    Guard.notAngularWorkspace();

    return generate({
      type: ConstructType.Environments,
      command: `ng g ${ConstructType.Environments}`,
    });
  },
};
