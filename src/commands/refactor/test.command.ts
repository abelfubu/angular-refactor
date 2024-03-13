import { window } from 'vscode';
import { CommandDefinition } from '../../models/command-definition.model';
import { Command } from '../../models/command.enum';
import { getAngularJsonProjectInfo } from '../../tools/angularjson/get-angular-json-project-info';

export const testCommand: CommandDefinition = {
  id: Command.Test,
  progressTitle: 'Testing...',
  execute: async () => {
    const response = await getAngularJsonProjectInfo(
      window.activeTextEditor?.document?.uri!,
    );

    console.log(response);
  },
};
