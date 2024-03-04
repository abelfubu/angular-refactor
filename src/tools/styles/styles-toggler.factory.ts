import { getInlineStylesArrayContent } from '../../utils/regex/get-inline-styles-array-content-util';
import { getInlineStylesContent } from '../../utils/regex/get-inline-styles-content.util';
import { getStyleUrlContent } from '../../utils/regex/get-style-url-content.util';
import { getStyleUrlsContent } from '../../utils/regex/get-styles-url-content.util';
import { fileToInlineStylesToggler } from './file-to-inline-styles.toggler';
import { stylesToFileToggler } from './styles-to-file.toggler';
import { StylesToggler } from './styles.toggler';

export function stylesTogglerFactory(document: string): StylesToggler | void {
  const inlineStylesExec = getInlineStylesContent(document);
  if (inlineStylesExec) {
    return stylesToFileToggler(inlineStylesExec);
  }

  const inlineStylesArrayExec = getInlineStylesArrayContent(document);
  if (inlineStylesArrayExec) {
    return stylesToFileToggler(inlineStylesArrayExec);
  }

  const styleUrlsExec = getStyleUrlsContent(document);
  if (styleUrlsExec) {
    return fileToInlineStylesToggler(styleUrlsExec);
  }

  const styleUrlExec = getStyleUrlContent(document);
  if (styleUrlExec) {
    return fileToInlineStylesToggler(styleUrlExec);
  }
}
