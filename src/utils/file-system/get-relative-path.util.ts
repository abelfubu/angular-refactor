import * as fs from 'fs';
import * as path from 'path';

export function getWorkspaceRelativePath(
  fullPath: string,
  basePath: string,
): string | null {
  const normalizedFullPath = path.normalize(fullPath);
  const normalizedBasePath = path.normalize(basePath);

  // Check if fullPath is a file, and if so, extract its directory
  const updatedFullPath =
    fs.existsSync(normalizedFullPath) &&
    fs.statSync(normalizedFullPath).isFile()
      ? path.dirname(normalizedFullPath)
      : normalizedFullPath;

  if (!normalizedFullPath.startsWith(updatedFullPath)) {
    return null;
  }

  const relativePath = path.relative(normalizedBasePath, updatedFullPath);

  const parts = relativePath.split(path.sep);
  const srcIndex = parts.indexOf('src');
  const appIndex = parts.indexOf('app');

  if (srcIndex === -1 || appIndex === -1) {
    return null;
  }

  return parts.slice(appIndex + 1).join(path.sep);
}
