import { SubmitJobCommand, SubmitJobCommandInput } from '@aws-sdk/client-batch';
import { batchClient } from './batchClient';

export async function publishScraperJob(id: string) {
  try {
    const input: SubmitJobCommandInput = {
      jobName: `scraper-${id}`,
      jobQueue: 'scraper-queue',
      jobDefinition: 'scrap-def',
      parameters: {
        //parameter command id
        commandId: id,
      },
    };
    const data = await batchClient.send(new SubmitJobCommand(input));
    console.log(`Job ${data.jobName} published.`);
    return data;
  } catch (err) {
    console.log('Error ', err);
    throw new Error(err);
  }
}
