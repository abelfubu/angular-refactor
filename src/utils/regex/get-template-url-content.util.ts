const regex = /templateUrl\s*:\s*['"`]([^'"`]+)['"`]/;

export function getTemplateUrlContent(text: string): RegExpExecArray | null {
  console.log(text);
  return regex.exec(text);
}
