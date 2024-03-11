import format from 'html-format';
import { Uri, WorkspaceEdit, workspace } from 'vscode';
import { getRange } from '../../utils/string/range.util';
import { TemplateToggler } from './template.toggler';

export const htmlToTemplateToggler = (
  exec: RegExpExecArray,
): TemplateToggler => ({
  toggle: async (document) => {
    const templateFilePath = Uri.file(
      document.fileName.replace(/.ts$/, '.html'),
    );
    const htmlFileContent = await workspace.fs.readFile(templateFilePath);
    const templateContent = format(htmlFileContent.toString());
    const range = getRange(exec, document);
    const edit = new WorkspaceEdit();
    const newContent = `template: \`\n${templateContent}\n\``;
    edit.replace(document.uri, range, newContent);
    await workspace.fs.delete(templateFilePath);
    workspace.applyEdit(edit);
  },
});
