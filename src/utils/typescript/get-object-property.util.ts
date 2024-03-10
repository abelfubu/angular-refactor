import {
  KindToNodeMappings,
  ObjectLiteralExpression,
  SyntaxKind,
} from 'ts-morph';

export function getObjectProperty<T extends SyntaxKind>(
  source: ObjectLiteralExpression,
  propertyName: string,
  type: T,
): KindToNodeMappings[T] | undefined {
  return source.getProperty(propertyName)?.getLastChildByKindOrThrow(type);
}
