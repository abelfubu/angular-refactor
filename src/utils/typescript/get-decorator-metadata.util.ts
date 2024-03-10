import { Decorator, ObjectLiteralExpression, SyntaxKind } from 'ts-morph';

export function getDecoratorMetadata(
  source: Decorator,
): ObjectLiteralExpression {
  return source
    .getArguments()[0]
    .asKindOrThrow(SyntaxKind.ObjectLiteralExpression);
}
