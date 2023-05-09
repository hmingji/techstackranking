import { BatchClient, BatchClientConfig } from '@aws-sdk/client-batch';

const config: BatchClientConfig = {
  region: 'ap-southeast-1',
};

export const batchClient = new BatchClient(config);
