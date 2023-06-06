import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';

let config: DynamoDBClientConfig;

if (process.env.NODE_ENV === 'development') {
  config = {
    endpoint: 'http://localhost:8000',
    region: 'ap-southeast-1',
  };
} else {
  config = {
    region: 'ap-southeast-1',
  };
}

const ddbClient = new DynamoDBClient(config);

export { ddbClient };
