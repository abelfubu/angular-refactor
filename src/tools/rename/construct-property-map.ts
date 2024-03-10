import { ConstructWithSelector } from '../../models/construct-with-selector.type';
import { ConstructType } from '../../models/construct.type';

export const constructPropertyMap: Record<
  ConstructWithSelector,
  'name' | 'selector'
> = {
  [ConstructType.Pipe]: 'name',
  [ConstructType.Component]: 'selector',
  [ConstructType.Directive]: 'selector',
};

export function getConstructPropertySelector(
  constructType: ConstructWithSelector,
) {
  return constructPropertyMap[constructType];
}
