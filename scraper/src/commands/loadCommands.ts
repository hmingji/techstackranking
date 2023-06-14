import { Command } from './commands';
import { indeedsgCommands } from './commands';

const commands: Record<string, Command[]> = {
  indeedsg: indeedsgCommands,
};
export function loadCommands(commandsName: string) {
  return commands[commandsName];
}
