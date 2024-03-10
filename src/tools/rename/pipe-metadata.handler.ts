import { camelize } from '@angular-devkit/core/src/utils/strings';
import { MetadataHandler } from './metadata-handler.model';

export const pipeMetadataHandler: MetadataHandler = (
  source: string,
  fileName: string,
) => {
  const newName = camelize(fileName);

  return {
    metadataValue: newName,
    findAndReplaceValue: newName,
    regex: new RegExp(`\\b${source}\\b`, 'g'),
  };
};
