import { ExtensionContext, commands } from 'vscode';
import * as refactorCommands from './refactor';
import * as schematicCommands from './schematics';

export function generateCommands(context: ExtensionContext): void {
  Object.values({ ...schematicCommands, ...refactorCommands }).forEach(
    ({ id, execute }) => {
      context.subscriptions.push(commands.registerCommand(id, execute));
    },
  );
}
