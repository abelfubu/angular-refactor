import { Guard } from '../../guards/guard';
import { CommandDefinition } from '../../models/command-definition.model';
import { Command } from '../../models/command.enum';
import { ConstructType } from '../../models/construct.type';
import { promptInput } from '../../utils/prompt/prompt-input.util';
import { generate } from '../../utils/terminal/generate.util';

export const generateLibraryCommand: CommandDefinition = {
  id: Command.GenerateLibrary,
  progressTitle: 'Generating library...',
  execute: async () => {
    Guard.notAngularWorkspace();

    const name = await promptInput(ConstructType.Library);

    Guard.notNullOrEmpty(name, 'Library name is required');

    return generate({
      type: ConstructType.Library,
      command: `ng g ${ConstructType.Library} ${name}`,
    });
  },
};
