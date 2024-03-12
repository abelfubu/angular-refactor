import { NewLineKind, Project } from 'ts-morph';

/**
 * If we do no check for new line type, it will generate a lot of
 * git changes only about line endings in projects where developers
 * work with different OS's
 */
export async function saveProject(project: Project): Promise<void> {
  for (const sourceFile of project.getSourceFiles()) {
    if (sourceFile.compilerNode.endOfFileToken.getFullText()[0] !== '\n') {
      project.manipulationSettings.set({ newLineKind: NewLineKind.LineFeed });
    } else {
      project.manipulationSettings.set({
        newLineKind: NewLineKind.CarriageReturnLineFeed,
      });
    }

    await sourceFile.save();
  }
}
