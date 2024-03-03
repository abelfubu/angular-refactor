import { Uri, commands, env } from 'vscode';

export async function readFilePath(): Promise<Uri> {
  const originalClipboard = await env.clipboard.readText();
  await commands.executeCommand('copyFilePath');
  const newUri = await env.clipboard.readText();
  await env.clipboard.writeText(originalClipboard);
  return Uri.file(newUri);
}
