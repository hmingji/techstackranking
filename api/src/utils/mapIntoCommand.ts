import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { Command } from '../repositories/command';

export function mapIntoCommand(item: Record<string, AttributeValue>): Command {
  const id = item.pk.S.split('|')[1];
  const name = item.name.S;
  const command = item.command.S;
  return { id, name, command };
}
