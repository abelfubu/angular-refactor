export type MetadataHandler = (
  source: string,
  fileName: string,
) => {
  metadataValue: string;
  findAndReplaceValue: string;
  regex: RegExp;
};
