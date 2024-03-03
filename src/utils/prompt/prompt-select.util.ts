import { window } from 'vscode';
import { SchematicType } from '../../models/schematic.type';

export async function promptSelect(
  type: SchematicType,
  options: string[],
): Promise<string | undefined> {
  const pick = await window.showQuickPick(
    options.map((option) => ({ label: option })),
    { placeHolder: `Select ${type}` },
  );

  return pick?.label;
}
