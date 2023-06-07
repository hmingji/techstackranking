import { uploadToS3 } from './s3/uploadToS3';
import { launchPuppeteer } from './puppeteer/launchPuppeteer';
import { loadCommands } from './commands/loadCommands';
import { executeCommands } from './commands/executeCommands';
import { getCommandById } from './dynamodb/getCommandById';
import { publishProcessorJob } from 'batch/publishProcessorJob';

async function main() {
  //add functionality to get command from ddb
  //based on input in cmd argument
  //extract map creation will be moved into here
  //add functionality to send command to processor after completing
  const commandIdFlagIdx = process.argv.indexOf('-id');
  if (commandIdFlagIdx <= -1) {
    console.log('No command id provided, exiting...');
    return;
  }
  //process.argv[keyFlagIdx + 1]
  const browser = await launchPuppeteer();
  const page = await browser.newPage();
  //const commandsToScrapIndeed = loadCommands('indeedsg'); //local command
  const commandsToScrap = await getCommandById(
    process.argv[commandIdFlagIdx + 1]
  );
  if (!commandsToScrap) {
    console.log('Command not found from db, exiting...');
    return;
  }
  const contentScraped = await executeCommands(page, commandsToScrap, {
    loopOver: false,
  });
  await browser.close();
  console.log('scraping completed, now uploading scraped data to s3');

  const timestamp = new Date(Date.now()).toISOString();
  await uploadToS3(`scrap-data-${timestamp}`, JSON.stringify(contentScraped));
  await publishProcessorJob(timestamp);

  console.log('upload completed. now exiting');
}

main();
