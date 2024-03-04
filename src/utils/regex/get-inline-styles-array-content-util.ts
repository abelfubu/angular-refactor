const regex = /styles:\s*\[([\s\S]*?)\]/;

export function getInlineStylesArrayContent(
  text: string,
): RegExpExecArray | null {
  return regex.exec(text);
}
