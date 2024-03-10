import { ExtensionContext } from 'vscode';
import { generateCodeActions } from './code-actions/generate-code-actions';
import { generateCommands } from './commands/generate-commands';

export async function activate(context: ExtensionContext) {
  console.log('Extension "angular-generator" is now active!');
  generateCommands(context);
  generateCodeActions(context);
}

export function deactivate() {}
