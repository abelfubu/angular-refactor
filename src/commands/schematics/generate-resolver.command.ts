import { Guard } from '../../guards/guard';
import { CommandDefinition } from '../../models/command-definition.model';
import { Command } from '../../models/command.enum';
import { ConstructType } from '../../models/construct.type';
import { getBaseFolder } from '../../utils/file-system/get-base-folder.util';
import { promptInput } from '../../utils/prompt/prompt-input.util';
import { generate } from '../../utils/terminal/generate.util';

export const generateResolverCommand: CommandDefinition = {
  id: Command.GenerateResolver,
  execute: async () => {
    Guard.notAngularWorkspace();

    const name = await promptInput(ConstructType.Resolver);

    Guard.notNullOrEmpty(name, 'Resolver name is required');

    const baseFolder = await getBaseFolder();
    return generate({
      type: ConstructType.Resolver,
      command: `ng g ${ConstructType.Resolver} ${baseFolder}/${name}`,
    });
  },
};
