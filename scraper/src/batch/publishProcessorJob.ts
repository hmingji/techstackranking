import { SubmitJobCommandInput, SubmitJobCommand } from '@aws-sdk/client-batch';
import { batchClient } from './batchClient';

export async function publishProcessorJob(timestamp: string, id: string) {
  try {
    const input: SubmitJobCommandInput = {
      jobName: `processor-${id}`,
      jobQueue: 'processor-queue',
      jobDefinition: 'processor-def',
      parameters: {
        taskCommand: `ts-node src/index.ts -k scrap-data-${timestamp}`,
      },
    };

    const data = await batchClient.send(new SubmitJobCommand(input));
    console.log(`Job ${data.jobName} published.`);
    return data;
  } catch (err: any) {
    console.log('Error ', err);
    throw new Error(err);
  }
}
