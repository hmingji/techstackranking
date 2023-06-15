import {
  PutItemCommandInput,
  PutItemCommand,
  ScanCommandInput,
  ScanCommand,
  DeleteItemCommandInput,
  DeleteItemCommand,
  UpdateItemCommandInput,
  UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';
import { mapIntoCommand } from '../utils/mapIntoCommand';
import { PaginatedCommands, Command } from './command';
import { ddbClient } from './dynamo';

const tableName =
  process.env.DEMO === 'false'
    ? process.env.PROD_TABLE_NAME
    : process.env.DEMO_TABLE_NAME;

async function createCommand({ id, name, command }: Command) {
  try {
    const params: PutItemCommandInput = {
      TableName: tableName,
      Item: {
        pk: { S: `command|${id}` },
        name: { S: name },
        command: { S: command },
      },
    };
    const data = await ddbClient.send(new PutItemCommand(params));
    console.log(data);
    return { id, name, command } as Command;
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
}

async function getAllCommands(limit: number, exclusiveStartKey: string | null) {
  try {
    let params: ScanCommandInput = {
      TableName: tableName,
      FilterExpression: 'begins_with (pk, :prefix)',
      ExpressionAttributeValues: {
        ':prefix': { S: 'command' },
      },
      Limit: limit,
    };
    if (exclusiveStartKey)
      params['ExclusiveStartKey'] = {
        pk: { S: `command|${exclusiveStartKey}` },
      };
    const data = await ddbClient.send(new ScanCommand(params));
    console.log(data);
    if (!data.Items) return undefined;
    const commands = data.Items.map((i) => mapIntoCommand(i));
    return {
      data: commands,
      lastEvaluationKey: data.LastEvaluatedKey
        ? data.LastEvaluatedKey.pk.S.split('|')[1]
        : null,
    } as PaginatedCommands;
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
}

async function removeCommand(id: string) {
  try {
    const params: DeleteItemCommandInput = {
      TableName: tableName,
      Key: {
        pk: {
          S: `command|${id}`,
        },
      },
    };
    const data = await ddbClient.send(new DeleteItemCommand(params));
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
}

async function updateCommand(newCommand: Command) {
  try {
    const params: UpdateItemCommandInput = {
      TableName: tableName,
      Key: {
        pk: { S: `command|${newCommand.id}` },
      },
      ExpressionAttributeValues: {
        ':newName': { S: newCommand.name },
        ':newCommand': { S: newCommand.command },
      },
      ExpressionAttributeNames: {
        '#name': 'name',
        '#command': 'command',
      },
      UpdateExpression: 'SET #name = :newName, #command = :newCommand',
      ReturnValues: 'ALL_NEW',
    };
    const data = await ddbClient.send(new UpdateItemCommand(params));
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
}

export { createCommand, getAllCommands, removeCommand, updateCommand };
