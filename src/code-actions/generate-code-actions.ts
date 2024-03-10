import { ExtensionContext, languages } from 'vscode';

import * as refactorCodeActions from './refactor';

export function generateCodeActions(context: ExtensionContext): void {
  Object.values({ ...refactorCodeActions }).forEach(
    ({ selector, provider }) => {
      context.subscriptions.push(
        languages.registerCodeActionsProvider(selector, provider),
      );
    },
  );
}
