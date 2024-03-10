import { ObjectLiteralExpression, SyntaxKind } from 'ts-morph';
import { ConstructWithSelector } from '../../models/construct-with-selector.type';
import { getObjectProperty } from './get-object-property.util';

export function udpateFileImportsInComponentMetadata(
  metadata: ObjectLiteralExpression,
  fileName: string,
  constructType: ConstructWithSelector,
): void {
  const styleUrlsProperty = getObjectProperty(
    metadata,
    'styleUrls',
    SyntaxKind.ArrayLiteralExpression,
  );

  if (styleUrlsProperty) {
    const url = styleUrlsProperty.getFirstDescendantByKind(
      SyntaxKind.StringLiteral,
    );

    url?.setLiteralValue(`./${fileName}.${constructType}.css`);
  }

  const styleUrlProperty = getObjectProperty(
    metadata,
    'styleUrl',
    SyntaxKind.StringLiteral,
  );

  if (styleUrlProperty) {
    styleUrlProperty.setLiteralValue(`./${fileName}.${constructType}.html`);
  }

  const templateUrl = getObjectProperty(
    metadata,
    'templateUrl',
    SyntaxKind.StringLiteral,
  );

  if (templateUrl) {
    templateUrl.setLiteralValue(`./${fileName}.${constructType}.html`);
  }
}
