import { window } from 'vscode';
import { SchematicType } from '../../models/schematic.type';

export async function promptInput(
  type: SchematicType,
): Promise<string | undefined> {
  return await window.showInputBox({
    prompt: `Enter the ${type} name`,
  });
}
