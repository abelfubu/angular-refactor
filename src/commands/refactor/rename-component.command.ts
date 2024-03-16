import { CommandDefinition } from '@models/command-definition.model';
import { Command } from '@models/command.enum';
import { ConstructType } from '@models/construct.type';
import { renamer } from '@tools/rename/renamer';

export const renameComponentCommand: CommandDefinition = {
  id: Command.RenameComponent,
  progressTitle: 'Renaming component...',
  execute: () => renamer(ConstructType.Component),
};
