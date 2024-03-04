import { writeFileSync } from 'fs';
import format from 'html-format';
import { WorkspaceEdit, workspace } from 'vscode';
import { extractFileName } from '../../utils/string/extract-filename.util';
import { getRange } from '../../utils/string/range.util';
import { TemplateToggler } from './template.toggler';

export const templateToHtmlToggler = (
  exec: RegExpExecArray,
): TemplateToggler => ({
  toggle: (document) => {
    const templateFileContent = format(exec[1]).trim();
    const templateFilePath = document.fileName.replace(/.ts$/, '.html');
    writeFileSync(templateFilePath, templateFileContent);
    const newContent = `templateUrl: './${extractFileName(templateFilePath)}'`;
    const edit = new WorkspaceEdit();
    const range = getRange(exec, document);
    edit.replace(document.uri, range, newContent);
    workspace.applyEdit(edit);
  },
});
