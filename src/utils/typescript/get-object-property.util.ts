import {
  KindToNodeMappings,
  ObjectLiteralExpression,
  SyntaxKind,
} from 'ts-morph';
import { AngularDecoratorMetadata } from '../angular/angular-decorator-metadata.model';

export function getObjectProperty<T extends SyntaxKind>(
  source: ObjectLiteralExpression,
  propertyName: AngularDecoratorMetadata,
  type: T,
): KindToNodeMappings[T] | undefined {
  return source.getProperty(propertyName)?.getLastChildByKindOrThrow(type);
}
