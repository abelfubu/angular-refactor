const regex = /templateUrl\s*:\s*['"`]([^'"`]+)['"`]/;

export function getTemplateUrlContent(text: string): RegExpExecArray | null {
  return regex.exec(text);
}
