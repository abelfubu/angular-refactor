const regex = /styleUrls: \['(.*)'\]/ || /styleUrl: `(.*)`/gm;

export function getStylesUrlContent(text: string): RegExpExecArray | null {
  return regex.exec(text);
}
