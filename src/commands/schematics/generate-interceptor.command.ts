import { Guard } from '../../guards/guard';
import { CommandDefinition } from '../../models/command-definition.model';
import { Command } from '../../models/command.enum';
import { ConstructType } from '../../models/construct.type';
import { getBaseFolder } from '../../utils/file-system/get-base-folder.util';
import { promptInput } from '../../utils/prompt/prompt-input.util';
import { generate } from '../../utils/terminal/generate.util';

export const generateInterceptorCommand: CommandDefinition = {
  id: Command.GenerateInterceptor,
  progressTitle: 'Generating interceptor...',
  execute: async () => {
    Guard.notAngularWorkspace();

    const name = await promptInput(ConstructType.Interceptor);

    Guard.notNullOrEmpty(name, 'Interceptor name is required');

    const baseFolder = await getBaseFolder();
    return generate({
      type: ConstructType.Interceptor,
      command: `ng g ${ConstructType.Interceptor} ${baseFolder}/${name}`,
    });
  },
};
