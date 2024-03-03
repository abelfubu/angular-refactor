const regex = /^.+\.module\.(spec.ts|ts)$/;

export function isModuleUri(uri: string): boolean {
  return regex.test(uri);
}
