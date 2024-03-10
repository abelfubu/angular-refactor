import { classify, dasherize } from '@angular-devkit/core/src/utils/strings';
import { MetadataHandler } from './metadata-handler.model';

export const directiveMetadataHandler: MetadataHandler = (
  source: string,
  fileName: string,
) => {
  const unParenthesized = source.replace('[', '').replace(']', '');
  const kebabCased = dasherize(unParenthesized);
  const prefix = kebabCased.split('-')[0];
  const newName = `${prefix}${classify(fileName)}`;

  return {
    metadataValue: `[${newName}]`,
    findAndReplaceValue: `${newName}`,
    regex: new RegExp(unParenthesized, 'g'),
  };
};
