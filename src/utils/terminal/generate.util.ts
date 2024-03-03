import { window, workspace } from 'vscode';
import { GenerateConfig } from '../../models/generate-config.model';
import { titleCase } from '../string/titlecase.util';
import { execAsync } from './exec.util';

export async function generate({
  type,
  command,
}: GenerateConfig): Promise<void> {
  const [workspaceFolder] = workspace.workspaceFolders!;

  try {
    await execAsync(command, workspaceFolder.uri.fsPath);

    window.showInformationMessage(`${titleCase(type)} created`);
  } catch (error) {
    window.showErrorMessage((error as Error).message);
  }
}
