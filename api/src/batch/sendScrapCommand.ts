import { SubmitJobCommand, SubmitJobCommandInput } from '@aws-sdk/client-batch';
import { batchClient } from './batchClient';

const input: SubmitJobCommandInput = {
  jobName: 'startScrap',
  jobQueue: 'simplejob-queue',
  jobDefinition: 'simplejob-def',
};

export const sendScrapCommand = async () => {
  try {
    const data = await batchClient.send(new SubmitJobCommand(input));
    console.log('Success sending command ', data);
    return data;
  } catch (err) {
    console.log('Error ', err);
    throw new Error(err);
  }
};
