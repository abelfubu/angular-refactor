export interface CommandDefinition {
  id: string;
  progressTitle: string;
  execute: () => Promise<void | string>;
}
