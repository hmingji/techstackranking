import { uploadToS3 } from './s3/uploadToS3';
import { launchPuppeteer } from './puppeteer/launchPuppeteer';
import { executeCommands } from './commands/executeCommands';
import { getCommandById } from './dynamodb/getCommandById';
import { publishProcessorJob } from './batch/publishProcessorJob';

// add try catch clause
async function main() {
  const commandIdFlagIdx = process.argv.indexOf('-id');
  process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
  });
  if (commandIdFlagIdx <= -1) {
    console.log('No command id provided, exiting...');
    return;
  }

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
