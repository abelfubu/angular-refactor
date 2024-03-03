import { readFileSync, unlinkSync } from 'fs';
import format from 'html-format';
import { WorkspaceEdit, workspace } from 'vscode';
import { getRange } from '../../utils/string/range.util';
import { TemplateToggler } from './template.toggler';

export const htmlToTemplateToggler = (
  exec: RegExpExecArray,
): TemplateToggler => ({
  toggle: (document) => {
    const templateFilePath = document.fileName.replace(/.ts$/, '.html');
    const htmlFileContent = readFileSync(templateFilePath).toString();
    const templateContent = format(htmlFileContent);
    const range = getRange(exec, document);
    const edit = new WorkspaceEdit();
    const newContent = `template: \`${templateContent}\``;
    edit.replace(document.uri, range, newContent);
    unlinkSync(templateFilePath);
    workspace.applyEdit(edit);
  },
});
