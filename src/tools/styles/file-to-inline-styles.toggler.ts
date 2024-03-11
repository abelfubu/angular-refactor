import { Uri, WorkspaceEdit, workspace } from 'vscode';
import { getRange } from '../../utils/string/range.util';
import { StylesToggler } from './styles.toggler';

export const fileToInlineStylesToggler = (
  exec: RegExpExecArray,
): StylesToggler => ({
  toggle: async (document) => {
    const templateFilePath = Uri.file(
      document.fileName.replace(/.ts$/, '.scss'),
    );
    const scssFile = await workspace.fs.readFile(templateFilePath);
    const scssFileContent = scssFile.toString();
    const range = getRange(exec, document);
    const edit = new WorkspaceEdit();
    const newContent = `styles: \`\n${scssFileContent}\n\``;
    edit.replace(document.uri, range, newContent);
    await workspace.fs.delete(templateFilePath);
    workspace.applyEdit(edit);
  },
});
