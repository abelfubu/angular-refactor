import { ConstructWithSelector } from '../../models/construct-with-selector.type';
import { ConstructType } from '../../models/construct.type';
import { componentMetadataHandler } from './component-metadata.handler';
import { directiveMetadataHandler } from './directive-metadata.handler';
import { MetadataHandler } from './metadata-handler.model';
import { pipeMetadataHandler } from './pipe-metadata.handler';

export function metadataHanderFactory(
  constructType: ConstructWithSelector,
): MetadataHandler {
  if (constructType === ConstructType.Component) {
    return componentMetadataHandler;
  }

  if (constructType === ConstructType.Directive) {
    return directiveMetadataHandler;
  }

  if (constructType === ConstructType.Pipe) {
    return pipeMetadataHandler;
  }

  throw new Error('Invalid construct type');
}
