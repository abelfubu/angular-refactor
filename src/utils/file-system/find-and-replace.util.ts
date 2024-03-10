import { Uri, workspace } from 'vscode';

export async function findAndReplace(
  uri: Uri,
  matcher: RegExp,
  replacer: string,
): Promise<void> {
  const document = await workspace.fs.readFile(uri);
  const updatedText = document.toString().replace(matcher, replacer);
  await workspace.fs.writeFile(Uri.file(uri.fsPath), Buffer.from(updatedText));
}
