import { window } from 'vscode';
import { ConstructType } from '../../models/construct.type';

export async function promptSelect(
  type: ConstructType,
  options: string[],
): Promise<string | undefined> {
  const pick = await window.showQuickPick(
    options.map((option) => ({ label: option })),
    { placeHolder: `Select ${type}` },
  );

  return pick?.label;
}
