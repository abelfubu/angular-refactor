const regex = /styles\s*:\s*`([\s\S]*?)`/;

export function getInlineStylesContent(text: string): RegExpExecArray | null {
  return regex.exec(text);
}
