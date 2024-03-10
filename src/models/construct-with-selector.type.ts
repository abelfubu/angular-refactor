import { ConstructType } from './construct.type';

export type ConstructWithSelector =
  | ConstructType.Component
  | ConstructType.Pipe
  | ConstructType.Directive;
