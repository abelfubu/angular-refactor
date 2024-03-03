export interface CommandDefinition {
  id: string;
  execute: () => Promise<void | string>;
}
