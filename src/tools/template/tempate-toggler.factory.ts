import { getInlineTemplateContent } from '../../utils/regex/get-inline-template-content.util';
import { getTemplateUrlContent } from '../../utils/regex/get-template-url-content.util';
import { htmlToTemplateToggler } from './html-to-template.toggler';
import { templateToHtmlToggler } from './template-to-html.toggler';
import { TemplateToggler } from './template.toggler';

export function templateTogglerFactory(
  document: string,
): TemplateToggler | void {
  const inlineTemplateExec = getInlineTemplateContent(document);
  if (inlineTemplateExec) {
    return templateToHtmlToggler(inlineTemplateExec);
  }

  const templateUrlExec = getTemplateUrlContent(document);
  if (templateUrlExec) {
    return htmlToTemplateToggler(templateUrlExec);
  }
}
