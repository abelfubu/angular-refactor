/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { workspace } from 'vscode';
import * as lsp from 'vscode-languageserver-protocol';

export function isValidWorkspace(): boolean {
  const workspaceFolder = workspace.workspaceFolders?.[0].uri.fsPath;
  const isAngularProject = new lsp.RequestType<
    { textDocument: lsp.TextDocumentIdentifier },
    boolean | null,
    void
  >('angular/isAngularCoreInOwningProject');

  return !!workspaceFolder && !!isAngularProject;
}
