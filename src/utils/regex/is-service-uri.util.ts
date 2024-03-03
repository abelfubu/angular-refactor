const regex = /^.+\.service\.(spec.ts|ts)$/;

export function isServiceUri(uri: string): boolean {
  return regex.test(uri);
}
