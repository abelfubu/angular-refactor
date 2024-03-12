import { ConstructWithSelector } from '../../models/construct-with-selector.type';
import { ConstructType } from '../../models/construct.type';
import { componentRenamer } from './component-renamer';
import { directiveRenamer } from './directive-renamer';
import { pipeRenamer } from './pipe-renamer';
import { Renamer } from './renamer.model';

export function renamerFactory(contructType: ConstructWithSelector): Renamer {
  if (contructType === ConstructType.Component) {
    return componentRenamer();
  }

  if (contructType === ConstructType.Pipe) {
    return pipeRenamer();
  }

  if (contructType === ConstructType.Directive) {
    return directiveRenamer();
  }

  throw new Error('Invalid construct type');
}
