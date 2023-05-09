import puppeteer from 'puppeteer';

type Quote = {
  text: string | undefined;
  author: string | undefined;
};

const startScrap = async () => {
  console.log('launching puppeteer...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/google-chrome',
    args: [
      '--no-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
    ],
  });
  const page = await browser.newPage();
  await page.goto('http://quotes.toscrape.com/', {
    waitUntil: 'domcontentloaded',
  });
  let allQuotes: Quote[] = [];

  const quotes: Quote[] = await page.evaluate(() => {
    const quoteList = document.querySelectorAll('.quote');

    return Array.from(quoteList).map((quote) => {
      const text = quote.querySelector('.text')?.innerHTML;
      const author = quote.querySelector('.author')?.innerHTML;
      return { text, author };
    });
  });
  allQuotes.push(...quotes);
  console.log('completed scrap');
  console.log(allQuotes);

  await page.close();
  await browser.close();
};

startScrap();
