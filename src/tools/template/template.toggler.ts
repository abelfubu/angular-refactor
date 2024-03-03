import { TextDocument } from 'vscode';

export interface TemplateToggler {
  toggle: (document: TextDocument) => void;
}
