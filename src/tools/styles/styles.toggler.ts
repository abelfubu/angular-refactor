import { TextDocument } from 'vscode';

export interface StylesToggler {
  toggle: (document: TextDocument) => void;
}
