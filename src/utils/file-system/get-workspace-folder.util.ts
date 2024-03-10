import { Uri, workspace } from 'vscode';

export function getWorkspaceFolder(): Uri | undefined {
  return workspace.workspaceFolders?.[0].uri;
}
