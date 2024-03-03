const regex = /\.component\.ts$/;

export function isComponentTsFile(uri: string): boolean {
  return regex.test(uri);
}
