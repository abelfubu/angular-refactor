import { TextDocument, window } from 'vscode';

export function getActiveDocument(): TextDocument | undefined {
  return window.activeTextEditor?.document;
}
