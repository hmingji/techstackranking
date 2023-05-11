import { uploadToS3 } from './s3/uploadToS3';
import { launchPuppeteer } from './puppeteer/launchPuppeteer';
import { loadCommands } from './commands/loadCommands';
import { executeCommands } from './commands/executeCommands';

async function main() {
  const browser = await launchPuppeteer();
  const page = await browser.newPage();
  const commandsToScrapIndeed = loadCommands('indeedsg');
  const contentScraped = await executeCommands(page, commandsToScrapIndeed, {
    loopOver: false,
  });
  await browser.close();
  console.log('scraping completed, now uploading scraped data to s3');
  //   await uploadToS3(
  //     `scrap-data-${new Date(Date.now()).toISOString()}`,
  //     JSON.stringify(contentScraped)
  //   );
  console.log('upload completed. now exiting');
}

main();
