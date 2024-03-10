import { window } from 'vscode';
import { ConstructType } from '../../models/construct.type';

export async function promptInput(
  type: ConstructType,
): Promise<string | undefined> {
  return await window.showInputBox({
    prompt: `Enter the ${type} name`,
  });
}
