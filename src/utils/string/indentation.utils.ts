export class Indent {
  static withTwoTabs(str: string): string {
    return str.replace(/\r?\n|\r/gm, '\r\n      ');
  }

  static unindent(str: string): string {
    return str.replace(/(\r?\n|\r)(\t\t|\t\t\t|\t\t\t\t|      )/gm, '\r\n');
  }
}
