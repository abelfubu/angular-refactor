const regex = /^.+\.directive\.(spec.ts|ts)$/;

export function isDirectiveUri(uri: string): boolean {
  return regex.test(uri);
}
