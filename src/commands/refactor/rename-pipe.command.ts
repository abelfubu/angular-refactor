import { CommandDefinition } from '../../models/command-definition.model';
import { Command } from '../../models/command.enum';
import { ConstructType } from '../../models/construct.type';
import { renamer } from '../../tools/rename/renamer';

export const renamePipeCommand: CommandDefinition = {
  id: Command.RenamePipe,
  execute: async () => renamer(ConstructType.Pipe),
};
