import vscode from 'vscode';
import { Guard } from '../../guards/guard';
import { CommandDefinition } from '../../models/command-definition.model';
import { Command } from '../../models/command.enum';
import { SchematicType } from '../../models/schematic.type';
import { getBaseFolder } from '../../utils/file-system/get-base-folder.util';
import { promptInput } from '../../utils/prompt/prompt-input.util';
import { generate } from '../../utils/terminal/generate.util';

export const generateServiceCommand: CommandDefinition = {
  id: Command.GenerateService,
  execute: async () => {
    Guard.notAngularWorkspace(() =>
      vscode.window.showErrorMessage('Not an Angular workspace'),
    );

    const name = await promptInput(SchematicType.Service);

    Guard.notNullOrEmpty(name, () =>
      vscode.window.showErrorMessage('Service name is required'),
    );

    const baseFolder = await getBaseFolder();
    return generate({
      type: SchematicType.Service,
      command: `ng g ${SchematicType.Service} ${baseFolder}/${name}`,
    });
  },
};
