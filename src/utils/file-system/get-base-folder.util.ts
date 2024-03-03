import { workspace } from 'vscode';
import { getWorkspaceRelativePath } from './get-relative-path.util';
import { readFilePath } from './read-file-path.util';

export async function getBaseFolder() {
  const [workspaceFolder] = workspace.workspaceFolders!;
  const uri = await readFilePath();
  return getWorkspaceRelativePath(uri.fsPath, workspaceFolder.uri.fsPath);
}
