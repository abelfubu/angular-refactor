import vscode from 'vscode';
import { Guard } from '../../guards/guard';
import { CommandDefinition } from '../../models/command-definition.model';
import { Command } from '../../models/command.enum';
import { SchematicType } from '../../models/schematic.type';
import { getBaseFolder } from '../../utils/file-system/get-base-folder.util';
import { promptInput } from '../../utils/prompt/prompt-input.util';
import { generate } from '../../utils/terminal/generate.util';

export const generateInterfaceCommand: CommandDefinition = {
  id: Command.GenerateInterface,
  execute: async () => {
    Guard.notAngularWorkspace(() =>
      vscode.window.showErrorMessage('Not an Angular workspace'),
    );

    const name = await promptInput(SchematicType.Interface);

    Guard.notNullOrEmpty(name, () =>
      vscode.window.showErrorMessage('Interface name is required'),
    );

    const baseFolder = await getBaseFolder();
    return generate({
      type: SchematicType.Interface,
      command: `ng g ${SchematicType.Interface} ${baseFolder}/${name}`,
    });
  },
};
