import { Command, RawCommand } from '../commands/commands';

export function mapIntoCommands(data: RawCommand[]) {
  for (const i of data) {
    if (i.action === 'extract') {
      let temp = i.extractMap!;
      i.extractMap = new Map<string, string>(
        temp.map((e: string[]) => [e[0], e[1]])
      );
    }

    if (i.action === 'loop') {
      i.commands = mapIntoCommands(i.commands!);
    }
  }
  return data as Command[];
}
