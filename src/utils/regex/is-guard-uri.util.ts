const regex = /^.+\.guard\.(spec.ts|ts)$/;

export function isGuardUri(uri: string): boolean {
  return regex.test(uri);
}
