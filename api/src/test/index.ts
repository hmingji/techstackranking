//create table in local dynamodb
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
    // {
    //   AttributeName: 'name',
    //   AttributeType: 'S',
    // },
    // {
    //   AttributeName: 'command',
    //   AttributeType: 'S',
    // },
  ],
  TableName: 'commands',
  KeySchema: [
    {
      AttributeName: 'pk',
      KeyType: 'HASH',
    },
  ],
  //   GlobalSecondaryIndexes: [
  //     {
  //       IndexName: 'Author-Quote',
  //       KeySchema: [
  //         {
  //           AttributeName: 'Author',
  //           KeyType: 'HASH',
  //         },
  //       ],
  //       Projection: {
  //         ProjectionType: 'ALL',
  //       },
  //       ProvisionedThroughput: {
  //         ReadCapacityUnits: 5,
  //         WriteCapacityUnits: 5,
  //       },
  //     },
  //   ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
  StreamSpecification: {
    StreamEnabled: false,
  },
};

async function createTable() {
  try {
    const data = await ddbClient.send(new CreateTableCommand(params));
    console.log('Table Created', data);
  } catch (err) {
    console.log('Error: ', err);
  }
}

async function writeItem() {
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

//createTable();
//writeItem();

// app.get('/createTable', async (req, res) => {
//   try {
//     const params: CreateTableCommandInput = {
//       AttributeDefinitions: [
//         {
//           AttributeName: 'pk',
//           AttributeType: 'S',
//         },
//       ],
//       TableName: 'commands',
//       KeySchema: [
//         {
//           AttributeName: 'pk',
//           KeyType: 'HASH',
//         },
//       ],
//       ProvisionedThroughput: {
//         ReadCapacityUnits: 5,
//         WriteCapacityUnits: 5,
//       },
//       StreamSpecification: {
//         StreamEnabled: false,
//       },
//     };
//     const data = await ddbClient.send(new CreateTableCommand(params));
//     console.log('Table Created', data);
//     res.status(200).send('success');
//   } catch (err) {
//     console.log('Error: ', err);
//     res.status(500).send('error');
//   }
// });
