import { CodeActionProvider, DocumentSelector } from 'vscode';

export interface CodeActionDefinition {
  selector: DocumentSelector;
  provider: CodeActionProvider;
}
