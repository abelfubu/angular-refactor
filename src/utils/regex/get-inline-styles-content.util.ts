const literal = /styles\s*:\s*`([\s\S]*?)`/;
const regex = /styles\s*:\s*\[\s*`([\s\S]*?)`\s*\]/;

export function getInlineStylesContent(text: string): RegExpExecArray | null {
  console.log('1', literal.exec(text));
  console.log('2', regex.exec(text));
  return literal.exec(text);
}
