import { SubmitJobCommandInput, SubmitJobCommand } from '@aws-sdk/client-batch';
import { batchClient } from './batchClient';

export async function publishProcessorJob(timestamp: string) {
  try {
    const input: SubmitJobCommandInput = {
      jobName: `processor-${timestamp}`,
      jobQueue: 'processor-queue',
      jobDefinition: 'processor-def',
      parameters: {
        //parameter scrap data file name
        scrapedKey: `scrap-data-${timestamp}`,
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
