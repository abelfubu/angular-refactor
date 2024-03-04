const regex = /styleUrl\s*:\s*['"`]([^'"`]+)['"`]/;

export function getStyleUrlContent(text: string): RegExpExecArray | null {
  return regex.exec(text);
}
