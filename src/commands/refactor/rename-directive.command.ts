import { CommandDefinition } from '../../models/command-definition.model';
import { Command } from '../../models/command.enum';
import { ConstructType } from '../../models/construct.type';
import { renamer } from '../../tools/rename/renamer';

export const renameDirectiveCommand: CommandDefinition = {
  id: Command.RenameDirective,
  progressTitle: 'Renaming directive...',
  execute: async () => renamer(ConstructType.Directive),
};
