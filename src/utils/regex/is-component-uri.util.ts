const regex = /^.+\.component\.(spec.ts|scss|css|sass|less|html|ts)$/;

export function isComponentUri(uri: string): boolean {
  return regex.test(uri);
}
