import {
  ScanCommandInput,
  ScanCommand,
  PutItemCommand,
  PutItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { ddbClient } from '../dynamodb/dynamo';
import { getCommandById } from '../dynamodb/getCommandById';
import { Command } from 'commands/executeCommands';
import { indeedsgCommands } from '../commands/commands';

getCommandById('234df7ef-5ff6-40e0-89eb-c449bf3e0472');

async function test() {
  try {
    const params: PutItemCommandInput = {
      TableName: 'command',
      Item: {
        pk: { S: `command|${'234df7ef-5ff6-40e0-89eb-c449bf3e0472'}` },
        name: { S: 'test01' },
        command: {
          S: '[{"action":"visitUrl","url":"https://sg.indeed.com/"},{"action":"click","selector":"#onetrust-reject-all-handler"},{"action":"sleep","ms":2000},{"action":"type","selector":"#text-input-what","text":"software engineer"},{"action":"press","key":"Enter"},{"action":"sleep","ms":3000},{"action":"click","selector":".icl-Modal-Close"},{"action":"sleep","ms":2000},{"action":"loop","loopOption":{"iterateBy":"selector","loopEndSelector":".jobsearch-LeftPane > nav > div:nth-child(7) > a","notFoundAsLoopEnd":true},"commands":[{"action":"loop","loopOption":{"iterateBy":"loopAmount","loopAmount":17},"commands":[{"action":"click","selector":".jobsearch-ResultsList > li:nth-child(::i) a"},{"action":"sleep","ms":2000},{"action":"extract","extractMap": [["position", ".jobsearch-JobInfoHeader-title"],["company", ".jobsearch-CompanyInfoContainer a"],["description", "#jobDescriptionText"]]}]},{"action":"click","selector":"div.jobsearch-LeftPane > nav > div:last-child > a"},{"action":"sleep","ms":4000},{"action":"press","key":"Enter"},{"action":"sleep","ms":1000}]},{"action":"sleep","ms":3000}]',
        },
      },
    };
    const data = await ddbClient.send(new PutItemCommand(params));
    console.log(data);
    return;
  } catch (err: any) {
    console.log(err);
    throw Error(err);
  }
}

//console.log(JSON.stringify(indeedsgCommands));
//test();
