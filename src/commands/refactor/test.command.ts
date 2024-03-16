import { Guard } from '@guards/guard';
import { CommandDefinition } from '@models/command-definition.model';
import { Command } from '@models/command.enum';
import { AngularDecoratorMetadata } from '@utils/angular/angular-decorator-metadata.model';
import { getDecoratorMetadata } from '@utils/typescript/get-decorator-metadata.util';
import { getObjectProperty } from '@utils/typescript/get-object-property.util';
import { Project, SyntaxKind } from 'ts-morph';
import { window } from 'vscode';

export const testCommand: CommandDefinition = {
  id: Command.Test,
  progressTitle: 'Testing...',
  execute: async () => {
    const { parse } = await import('angular-html-parser');
    const document = window.activeTextEditor?.document;
    Guard.notNullOrEmpty(document, 'No active editor found');

    const project = new Project();
    const file = project.addSourceFileAtPath(document.uri.fsPath);
    const component = file.getFirstDescendantByKind(
      SyntaxKind.ClassDeclaration,
    );
    const decorator = component?.getDecorator('Component');
    const metadata = getDecoratorMetadata(decorator!);
    const template = getObjectProperty(
      metadata,
      AngularDecoratorMetadata.Template,
      SyntaxKind.NoSubstitutionTemplateLiteral,
    );

    const { errors, rootNodes } = parse(template?.getLiteralValue() || '', {
      allowHtmComponentClosingTags: true,
    });

    if (errors.length) {
      throw new Error('Parse error');
    }
  },
};

function findElement(node: any[], selector: string): boolean {
  return node.some((node) => {
    if (node.type === 'element' && node.name === selector) {
      return true;
    }

    if (node.type === 'element' || node.type === 'block') {
      return findElement(node.children, selector);
    }

    return false;
  }, false);
}
