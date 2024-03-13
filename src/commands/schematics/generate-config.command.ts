import { Guard } from '../../guards/guard';
import { CommandDefinition } from '../../models/command-definition.model';
import { Command } from '../../models/command.enum';
import { ConstructType } from '../../models/construct.type';
import { promptSelect } from '../../utils/prompt/prompt-select.util';
import { generate } from '../../utils/terminal/generate.util';

export const generateConfigCommand: CommandDefinition = {
  id: Command.GenerateConfig,
  progressTitle: 'Generating config...',
  execute: async () => {
    Guard.notAngularWorkspace();

    const name = await promptSelect(ConstructType.Config, [
      'karma',
      'browserslist',
    ]);

    Guard.notNullOrEmpty(name, 'Config type is required');

    return generate({
      type: ConstructType.Config,
      command: `ng g ${ConstructType.Config} ${name}`,
    });
  },
};
