import { generateCodeActions } from '@code-actions/generate-code-actions';
import { generateCommands } from '@commands/generate-commands';
import { ExtensionContext } from 'vscode';

export async function activate(context: ExtensionContext) {
  console.log('Extension "angular-generator" is now active!');
  generateCommands(context);
  generateCodeActions(context);
}

export function deactivate() {}
