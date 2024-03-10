import { Project } from 'ts-morph';
import { Uri } from 'vscode';

export function isClass(className: string, documentUri: Uri): boolean {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(documentUri.fsPath);

  const classDeclaration = sourceFile.getClass(className);
  return !!classDeclaration;
}
