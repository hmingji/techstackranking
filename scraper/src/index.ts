import { uploadToS3 } from './s3/uploadToS3';
import { launchPuppeteer } from './puppeteer/launchPuppeteer';
import { executeCommands } from './commands/executeCommands';
import { getCommandById } from './dynamodb/getCommandById';
import { publishProcessorJob } from './batch/publishProcessorJob';
import { mapIntoCommands } from './utils/mapIntoCommands';

async function main(id: string) {
  try {
    const rawCommands = await getCommandById(id);
    if (!rawCommands) {
      console.log('Command not found from db, exiting...');
      return;
    }
    const commandsToScrap = mapIntoCommands(rawCommands);

    const browser = await launchPuppeteer();
    const page = await browser.newPage();
    const contentScraped = await executeCommands(page, commandsToScrap, {
      loopOver: false,
    });
    await browser.close();
    console.log('scraping completed, now uploading scraped data to s3');

    const timestamp = new Date(Date.now()).toISOString();
    await uploadToS3(`scrap-data-${timestamp}`, JSON.stringify(contentScraped));
    await publishProcessorJob(timestamp, id);

    console.log('upload completed. now exiting');
  } catch (err) {
    console.log(err);
  }
}

function getCommandIdFromArgv() {
  const commandIdFlagIdx = process.argv.indexOf('-id');

  if (commandIdFlagIdx <= -1) {
    console.log('No command provided, exiting...');
    return undefined;
  }
  const commandId = process.argv[commandIdFlagIdx + 1];
  return commandId;
}

const id = getCommandIdFromArgv();

if (id) main(id);
