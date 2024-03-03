import vscode from 'vscode';
import { Guard } from '../../guards/guard';
import { CommandDefinition } from '../../models/command-definition.model';
import { Command } from '../../models/command.enum';
import { SchematicType } from '../../models/schematic.type';
import { promptInput } from '../../utils/prompt/prompt-input.util';
import { generate } from '../../utils/terminal/generate.util';

export const generateLibraryCommand: CommandDefinition = {
  id: Command.GenerateLibrary,
  execute: async () => {
    Guard.notAngularWorkspace(() =>
      vscode.window.showErrorMessage('Not an Angular workspace'),
    );

    const name = await promptInput(SchematicType.Library);

    Guard.notNullOrEmpty(name, () =>
      vscode.window.showErrorMessage('Library name is required'),
    );

    return generate({
      type: SchematicType.Library,
      command: `ng g ${SchematicType.Library} ${name}`,
    });
  },
};
