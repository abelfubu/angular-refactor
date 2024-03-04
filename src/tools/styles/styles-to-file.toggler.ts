import { writeFileSync } from 'fs';
import { WorkspaceEdit, workspace } from 'vscode';
import { extractFileName } from '../../utils/string/extract-filename.util';
import { getRange } from '../../utils/string/range.util';
import { StylesToggler } from './styles.toggler';

export const stylesToFileToggler = (exec: RegExpExecArray): StylesToggler => ({
  toggle: async (document) => {
    const templateFileContent = exec[1].trim().replaceAll('`', '');
    const templateFilePath = document.fileName.replace(/.ts$/, '.scss');
    writeFileSync(templateFilePath, templateFileContent);
    const newContent = `styleUrl: './${extractFileName(templateFilePath)}'`;
    const edit = new WorkspaceEdit();
    const range = getRange(exec, document);
    edit.replace(document.uri, range, newContent);
    workspace.applyEdit(edit);
  },
});
