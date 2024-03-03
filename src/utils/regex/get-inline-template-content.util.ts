const regex = /template: `([\s\S]*?)`/;

export function getInlineTemplateContent(text: string): RegExpExecArray | null {
  return regex.exec(text);
}
