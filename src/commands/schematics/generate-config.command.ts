import vscode from 'vscode';
import { Guard } from '../../guards/guard';
import { CommandDefinition } from '../../models/command-definition.model';
import { Command } from '../../models/command.enum';
import { SchematicType } from '../../models/schematic.type';
import { promptSelect } from '../../utils/prompt/prompt-select.util';
import { generate } from '../../utils/terminal/generate.util';

export const generateConfigCommand: CommandDefinition = {
  id: Command.GenerateConfig,
  execute: async () => {
    Guard.notAngularWorkspace(() =>
      vscode.window.showErrorMessage('Not an Angular workspace'),
    );

    const name = await promptSelect(SchematicType.Config, [
      'karma',
      'browserslist',
    ]);

    Guard.notNullOrEmpty(name, () =>
      vscode.window.showErrorMessage('Config type is required'),
    );

    return generate({
      type: SchematicType.Config,
      command: `ng g ${SchematicType.Config} ${name}`,
    });
  },
};
