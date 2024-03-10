import { MetadataHandler } from './metadata-handler.model';

export const componentMetadataHandler: MetadataHandler = (
  source: string,
  fileName: string,
) => {
  const prefix = source.split('-')[0];
  return {
    metadataValue: `${prefix}-${fileName}`,
    findAndReplaceValue: `${prefix}-${fileName}`,
    regex: new RegExp(`\\b${source}\\b`, 'g'),
  };
};
