import { readFileSync, unlinkSync } from 'fs';
import { WorkspaceEdit, workspace } from 'vscode';
import { getRange } from '../../utils/string/range.util';
import { StylesToggler } from './styles.toggler';

export const fileToInlineStylesToggler = (
  exec: RegExpExecArray,
): StylesToggler => ({
  toggle: async (document) => {
    const templateFilePath = document.fileName.replace(/.ts$/, '.scss');
    const scssFileContent = readFileSync(templateFilePath).toString();
    const range = getRange(exec, document);
    const edit = new WorkspaceEdit();
    const newContent = `styles: \`${scssFileContent}\``;
    edit.replace(document.uri, range, newContent);
    unlinkSync(templateFilePath);
    workspace.applyEdit(edit);
  },
});
