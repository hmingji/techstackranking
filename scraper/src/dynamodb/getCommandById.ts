import { GetItemCommand, GetItemCommandInput } from '@aws-sdk/client-dynamodb';
import { ddbClient } from './dynamo';
import { Command } from '../commands/executeCommands';

export async function getCommandById(id: string) {
  try {
    const params: GetItemCommandInput = {
      TableName: process.env.TABLE_NAME,
      Key: {
        pk: { S: `command|${id}` },
      },
    };
    const data = await ddbClient.send(new GetItemCommand(params));

    if (!data.Item) return undefined;

    const result: Command[] = JSON.parse(data.Item.command.S!);
    return result;
  } catch (err: any) {
    console.log(err);
    throw Error(err);
  }
}
