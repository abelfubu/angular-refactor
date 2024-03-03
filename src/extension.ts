import { ExtensionContext } from 'vscode';
import { generateCommands } from './commands/generate-commands';

export async function activate(context: ExtensionContext) {
  console.log('Extension "angular-generator" is now active!');
  generateCommands(context);
}

export function deactivate() {}
