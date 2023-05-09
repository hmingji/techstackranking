import puppeteer from 'puppeteer';

type Command = {
  selector?: string; // action target node
  action: string; //click, type, loop, extract, visitUrl
  commands?: Command[]; // list of commands to loop over
  loopEndSelector?: string; // dom node that indicate loop end
  notFoundAsLoopEnd?: Boolean; // dom node not found as loop end
  url?: string; // url to visit
};

const startScrap = async (commands: Command[]) => {
  console.log('launching puppeteer...');
  // const browser = await puppeteer.launch({
  //   headless: true,
  //   executablePath: '/usr/bin/google-chrome',
  //   args: [
  //     '--no-sandbox',
  //     '--disable-gpu',
  //     '--disable-dev-shm-usage',
  //     '--disable-setuid-sandbox',
  //   ],
  // });
  const browser = await puppeteer.launch({ headless: false }); //in dev mode
  const page = await browser.newPage();
  for (let i = 0; i < commands.length; i++) {
    switch (commands[i].action) {
      case 'visitUrl':
        page.goto(commands[i].url!, { waitUntil: 'networkidle0' });
      //todo: finish the command
    }
  }
  await page.goto('https://sg.indeed.com/', {
    waitUntil: 'networkidle0',
  });

  //type
  await page.type('#text-input-what', 'software engineer');
  // await page.click('#text-input-what');
  // await page.evaluate((text) => {
  //   (document.querySelector('#text-input-what') as HTMLInputElement).value =
  //     text;
  // }, 'software engineer');

  //click
  await new Promise((r) => setTimeout(r, 1000));
  await Promise.all([
    page.click('.yosegi-InlineWhatWhere-primaryButton'),
    page.waitForNavigation(),
  ]);

  const hasModal = await page.evaluate(() => {
    const modalCloseBtn = document.querySelector('.icl-Modal-Close');
    return modalCloseBtn;
  });

  if (hasModal) {
    await page.click('.icl-Modal-Close');
  }

  await Promise.all([
    page.click('.jobsearch-ResultsList > li:nth-child(7)'),
    //page.waitForNavigation(),
  ]);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const desc1 = await page.evaluate(() => {
    const description = document.querySelector(
      '#jobDescriptionText'
    )?.innerHTML;
    //console.log(description);
    return description;
  });
  console.log(desc1?.replace(/(<([^>]+)>)/gi, ''));
  await Promise.all([
    page.click('.jobsearch-ResultsList > li:nth-child(4)'),
    //page.waitForNavigation(),
    //new Promise((resolve) => setTimeout(resolve, 1000)),
  ]);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const desc2 = await page.evaluate(() => {
    const description = document.querySelector(
      '#jobDescriptionText'
    )?.innerHTML;
    //console.log(description);
    return description;
  });
  console.log(desc2?.replace(/(<([^>]+)>)/gi, ''));

  await page.close();
  await browser.close();
};

//startScrap();
