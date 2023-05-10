import { sleep } from './commands/sleep';
import { Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AnonymizePlugin from 'puppeteer-extra-plugin-anonymize-ua';
import { uploadToS3 } from './s3/uploadToS3';

type Command = {
  selector?: string; // action target node
  action: 'visitUrl' | 'click' | 'clickIfExist' | 'type' | 'extract' | 'loop'; //click, type, loop, extract, visitUrl
  commands?: Command[]; // list of commands to loop over
  url?: string; // url to visit
  text?: string;
  extractMap?: Map<string, string>; //properties => selector
  loopOption?: Omit<executeOption, 'loopOver'>;
};

type executeOption = {
  loopOver: Boolean;
  iterateBy?: 'loopAmount' | 'selector';
  loopAmount?: number;
  loopEndSelector?: string; // dom node that indicate loop end
  notFoundAsLoopEnd?: Boolean; // dom node not found as loop end
};

//testing commands
const commands: Command[] = [
  {
    action: 'visitUrl',
    url: 'https://sg.indeed.com/',
  },
  {
    action: 'clickIfExist',
    selector: '#onetrust-reject-all-handler',
  },
  {
    action: 'type',
    selector: '#text-input-what',
    text: 'software engineer',
  },
  // {
  //   action: 'click',
  //   selector: '.yosegi-InlineWhatWhere-primaryButton',
  // },
  {
    action: 'clickIfExist',
    selector: '.icl-Modal-Close',
  },
  {
    action: 'loop',
    loopOption: {
      iterateBy: 'loopAmount',
      loopAmount: 2,
    },
    commands: [
      {
        action: 'clickIfExist',
        selector: '.jobsearch-ResultsList > li:nth-child(::i) a',
      },
      {
        action: 'extract',
        extractMap: new Map<string, string>([
          ['description', '#jobDescriptionText'],
        ]),
      },
    ],
  },
];

const startScrap = async (commands: Command[]) => {
  console.log('launching puppeteer...');
  puppeteer.use(StealthPlugin()).use(AnonymizePlugin());
  // const browser = await puppeteer.launch({
  //   headless: false,
  //   executablePath: '/usr/bin/google-chrome',
  //   args: [
  //     '--no-sandbox',
  //     '--disable-gpu',
  //     '--disable-dev-shm-usage',
  //     '--disable-setuid-sandbox',
  //   ],
  // });

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1200, height: 800 },
    args: [
      '--remote-debugging-port=9222',
      '--remote-debugging-address=0.0.0.0',
    ],
  }); //in dev mode
  const page = await browser.newPage();
  async function executeCommands(
    page: Page,
    commands: Command[],
    {
      loopOver = false,
      loopEndSelector,
      notFoundAsLoopEnd,
      loopAmount,
      iterateBy,
    }: executeOption
  ) {
    let extractedContentList = [];
    let i = 0;
    let loopCount = 1;
    while (true) {
      if (i == commands.length && !loopOver) break;
      if (i == commands.length && loopOver) {
        if (iterateBy === 'selector') {
          const endNode = await page.evaluate(() => {
            return document.querySelector(loopEndSelector!);
          });
          const endNodeNotFound = endNode ? false : true;
          if (notFoundAsLoopEnd === endNodeNotFound) break;
        } else {
          if (loopCount === loopAmount) break;
        }
        console.log('reseting');
        i = 0;
        loopCount += 1;
      }
      switch (commands[i].action) {
        case 'visitUrl': {
          console.log(`visitUrl, action number: ${i}`);
          await page.goto(commands[i].url!, { waitUntil: 'networkidle0' });
          break;
        }
        case 'type': {
          console.log(`type, action number: ${i}`);
          await page.type(commands[i].selector!, commands[i].text!);
          await sleep(1000);
          await page.keyboard.press('Enter');
          await sleep(3000);
          break;
        }
        case 'click': {
          console.log(`click, action number: ${i}`);
          const selector =
            iterateBy && iterateBy === 'loopAmount'
              ? commands[i].selector!.replace('::i', loopCount.toString())
              : commands[i].selector!;
          console.log('selector', selector);
          await page.evaluate((s) => {
            console.log(document.querySelector(s)!);
            (document.querySelector(s)! as HTMLAnchorElement).click();
          }, selector);
          //await page.click(selector);
          await sleep(2000);

          break;
        }
        case 'clickIfExist': {
          console.log(`clickIfExist, action number: ${i}`);
          const selector =
            iterateBy && iterateBy === 'loopAmount'
              ? commands[i].selector!.replace('::i', loopCount.toString())
              : commands[i].selector!;
          console.log('selector: ', selector);
          const node = await page.evaluate((s) => {
            return document.querySelector(s);
          }, selector);
          console.log(node);
          if (node !== null) page.click(selector);
          await sleep(2000);
          break;
        }
        case 'extract': {
          console.log(
            `extract, action number: ${i} mp: ${commands[i].extractMap!}`
          );
          let content: Record<string, string> = {};
          commands[i].extractMap!.forEach(async (value, key) => {
            const text = await page.evaluate((s) => {
              return document.querySelector(s)?.innerHTML;
            }, value);

            content[key] = text ?? '';
          });
          // const content = await page.evaluate((mp) => {
          //   console.log(`mp: ${mp}`);
          //   let content = new Map<string, string>();
          //   for (const [key, value] of mp) {
          //     const text = document.querySelector(value)?.innerHTML ?? '';
          //     content.set(key, text);
          //   }
          //   return content;
          // }, commands[i].extractMap!);
          extractedContentList.push(content);
          break;
        }
        case 'loop': {
          console.log(`loop, action number: ${i}`);
          const extractedInLoop = await executeCommands(
            page,
            commands[i].commands!,
            {
              loopOver: true,
              ...commands[i].loopOption!,
            }
          );
          extractedInLoop.forEach((i) => extractedContentList.push(i));
          break;
        }
      }
      i += 1;
    }

    return extractedContentList;
  }

  const extract = await executeCommands(page, commands, { loopOver: false });
  //console.log(...extract);
  console.log('completed');
  // await page.goto('https://sg.indeed.com/', {
  //   waitUntil: 'networkidle0',
  // });

  // //type
  // await page.type('#text-input-what', 'software engineer');
  // // await page.click('#text-input-what');
  // // await page.evaluate((text) => {
  // //   (document.querySelector('#text-input-what') as HTMLInputElement).value =
  // //     text;
  // // }, 'software engineer');

  // //click
  // await new Promise((r) => setTimeout(r, 1000));
  // await Promise.all([
  //   page.click('.yosegi-InlineWhatWhere-primaryButton'),
  //   page.waitForNavigation(),
  // ]);

  // const hasModal = await page.evaluate(() => {
  //   const modalCloseBtn = document.querySelector('.icl-Modal-Close');
  //   return modalCloseBtn;
  // });

  // if (hasModal) {
  //   await page.click('.icl-Modal-Close');
  // }

  // await Promise.all([
  //   page.click('.jobsearch-ResultsList > li:nth-child(7)'),
  //   //page.waitForNavigation(),
  // ]);
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // const desc1 = await page.evaluate(() => {
  //   const description = document.querySelector(
  //     '#jobDescriptionText'
  //   )?.innerHTML;
  //   //console.log(description);
  //   return description;
  // });
  // console.log(desc1?.replace(/(<([^>]+)>)/gi, ''));
  // await Promise.all([
  //   page.click('.jobsearch-ResultsList > li:nth-child(4)'),
  //   //page.waitForNavigation(),
  //   //new Promise((resolve) => setTimeout(resolve, 1000)),
  // ]);
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // const desc2 = await page.evaluate(() => {
  //   const description = document.querySelector(
  //     '#jobDescriptionText'
  //   )?.innerHTML;
  //   //console.log(description);
  //   return description;
  // });
  // console.log(desc2?.replace(/(<([^>]+)>)/gi, ''));

  //await page.close();
  await sleep(10000);
  await browser.close();
  const filecontent = JSON.stringify(extract);
  //uploadToS3(`scrap-data-${new Date(Date.now()).toISOString()}`, filecontent);
  //console.log('uploaded to s3');
  console.log(filecontent);
  return extract;
};

startScrap(commands);
