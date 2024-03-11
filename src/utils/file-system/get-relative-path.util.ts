import { existsSync, statSync } from 'fs';
import { dirname, normalize, relative, sep } from 'path';

export function getWorkspaceRelativePath(
  fullPath: string,
  basePath: string,
): string | null {
  const normalizedFullPath = normalize(fullPath);
  const normalizedBasePath = normalize(basePath);

  // Check if fullPath is a file, and if so, extract its directory
  const updatedFullPath =
    existsSync(normalizedFullPath) && statSync(normalizedFullPath).isFile()
      ? dirname(normalizedFullPath)
      : normalizedFullPath;

  if (!normalizedFullPath.startsWith(updatedFullPath)) {
    return null;
  }

  const relativePath = relative(normalizedBasePath, updatedFullPath);

  const parts = relativePath.split(sep);
  const srcIndex = parts.indexOf('src');
  const appIndex = parts.indexOf('app');

  if (srcIndex === -1 || appIndex === -1) {
    return null;
  }

  return parts.slice(appIndex + 1).join(sep);
}
