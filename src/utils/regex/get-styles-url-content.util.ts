const regex = /styleUrls: \['(.*)'\]/ || /styleUrl: `(.*)`/gm;

export function getStyleUrlsContent(text: string): RegExpExecArray | null {
  return regex.exec(text);
}
