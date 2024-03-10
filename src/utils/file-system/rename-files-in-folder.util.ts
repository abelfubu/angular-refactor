import { existsSync } from 'fs';
import { basename, dirname, join } from 'path';
import { Uri, workspace } from 'vscode';
import { ConstructType } from '../../models/construct.type';

export interface RenameInfo {
  extensions: string[];
  mainTsFile: string;
  newName: string;
  constructType: ConstructType;
}

export async function renameFilesInFolder({
  extensions,
  mainTsFile,
  newName,
  constructType,
}: RenameInfo) {
  const directory = dirname(mainTsFile);
  const file = basename(mainTsFile);
  const [oldName] = file.split('.');

  for (const extension of extensions) {
    const oldFile = join(directory, `${oldName}.${constructType}.${extension}`);

    if (!existsSync(oldFile)) {
      continue;
    }

    const newFile = join(directory, `${newName}.${constructType}.${extension}`);
    await workspace.fs.rename(Uri.file(oldFile), Uri.file(newFile));
  }
}
