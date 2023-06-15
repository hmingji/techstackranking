//create command table in local dynamodb
import {
  CreateTableCommand,
  CreateTableCommandInput,
  PutItemCommand,
  PutItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { ddbClient } from '../repositories/dynamo';

const params: CreateTableCommandInput = {
  AttributeDefinitions: [
    {
      AttributeName: 'pk',
      AttributeType: 'S',
    },
  ],
  TableName: 'commands',
  KeySchema: [
    {
      AttributeName: 'pk',
      KeyType: 'HASH',
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
  StreamSpecification: {
    StreamEnabled: false,
  },
};

async function createCommandTableForDev() {
  try {
    const data = await ddbClient.send(new CreateTableCommand(params));
    console.log('Table Created', data);
  } catch (err) {
    console.log('Error: ', err);
  }
}

async function testWriteItem() {
  try {
    const params: PutItemCommandInput = {
      TableName: 'commands',
      Item: {
        pk: { S: 'abc' },
        name: { S: 'people01' },
        command: { S: 'peopleCommand01' },
      },
    };

    const data = await ddbClient.send(new PutItemCommand(params));
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}
