import { classify } from '@angular-devkit/core/src/utils/strings';
import { Project, SyntaxKind } from 'ts-morph';
import { Uri } from 'vscode';
import { ConstructType } from '../../models/construct.type';
import { AngularDecoratorMetadata } from '../../utils/angular/angular-decorator-metadata.model';
import { getDecoratorMetadata } from '../../utils/typescript/get-decorator-metadata.util';
import { getObjectProperty } from '../../utils/typescript/get-object-property.util';

export interface ReplacerData {
  uri: Uri;
  regExp: RegExp;
  replacer: string;
  project: Project;
}

export async function findAndReplaceInComponentInlineTemplate({
  uri,
  regExp,
  replacer,
  project,
}: ReplacerData) {
  const sourceFile = project.addSourceFileAtPath(uri.fsPath);
  const construct = sourceFile.getFirstDescendantByKind(
    SyntaxKind.ClassDeclaration,
  );

  if (!construct) {
    return;
  }

  const decorator = construct.getDecorator(classify(ConstructType.Component));

  if (!decorator) {
    return;
  }

  const metadata = getDecoratorMetadata(decorator);

  const selectorValue = getObjectProperty(
    metadata,
    AngularDecoratorMetadata.Template,
    SyntaxKind.NoSubstitutionTemplateLiteral,
  );

  const inlineTemplate = selectorValue?.getLiteralValue();

  if (!inlineTemplate || !selectorValue) {
    return;
  }

  const updatedText = inlineTemplate.replace(regExp, replacer);

  selectorValue.setLiteralValue(updatedText);
}
