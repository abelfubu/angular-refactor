import { SchematicType } from './schematic.type';

export interface GenerateConfig {
  type: SchematicType;
  command: string;
}
