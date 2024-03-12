import { Uri, workspace } from 'vscode';
import { Guard } from '../../guards/guard';
import { getWorkspaceFolder } from '../../utils/file-system/get-workspace-folder.util';

export interface AngularJsonProjectInfo {
  prefix: string;
  styles: string;
  sourceRoot: string;
}

export async function getAngularJsonProjectInfo(
  activeDocumentUri: Uri,
): Promise<AngularJsonProjectInfo> {
  const basePath = getWorkspaceFolder();

  Guard.notNullOrEmpty(basePath, 'No workspace found');

  const [angularJsonFile] = await workspace.findFiles('angular.json');

  Guard.notNullOrEmpty(angularJsonFile, 'No angular.json found');

  const text = await workspace.fs.readFile(angularJsonFile);

  const angularJson = JSON.parse(text.toString());

  const projects = Object.keys(angularJson.projects);

  const projectName = projects.find((project) =>
    activeDocumentUri.path
      .replace(new RegExp(`${basePath.path}/`, 'i'), '')
      .startsWith(angularJson.projects[project].sourceRoot),
  );

  Guard.notNullOrEmpty(projectName, 'No project found');

  const { prefix, schematics, sourceRoot } = angularJson.projects[projectName];

  return {
    prefix,
    sourceRoot,
    styles: schematics?.['@schematics/angular:component']?.styles || 'css',
  };
}
