import { ExtensionContext, ProgressLocation, commands, window } from 'vscode';
import * as refactorCommands from './refactor';
import * as schematicCommands from './schematics';

export function generateCommands(context: ExtensionContext): void {
  Object.values({ ...schematicCommands, ...refactorCommands }).forEach(
    ({ id, progressTitle, execute }) => {
      context.subscriptions.push(
        commands.registerCommand(id, () => {
          window.withProgress(
            {
              location: ProgressLocation.Notification,
              title: progressTitle,
              cancellable: false,
            },
            execute,
          );
        }),
      );
    },
  );
}
