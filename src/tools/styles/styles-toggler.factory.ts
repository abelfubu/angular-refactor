import { getInlineStylesContent } from '../../utils/regex/get-inline-styles-content.util';
import { getStylesUrlContent } from '../../utils/regex/get-styles-url-content.util';
import { fileToInlineStylesToggler } from './file-to-inline-styles.toggler';
import { stylesToFileToggler } from './styles-to-file.toggler';
import { StylesToggler } from './styles.toggler';

export function stylesTogglerFactory(document: string): StylesToggler | void {
  if (document.includes('styles:')) {
    const inlineStylesExec = getInlineStylesContent(document);
    if (inlineStylesExec) {
      return stylesToFileToggler(inlineStylesExec);
    }
  }

  const stylesUrlExec = getStylesUrlContent(document);
  if (stylesUrlExec) {
    return fileToInlineStylesToggler(stylesUrlExec);
  }
}
