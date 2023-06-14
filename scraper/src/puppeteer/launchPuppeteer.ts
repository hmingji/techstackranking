import { Browser } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

export const launchPuppeteer = async () => {
  console.log('launching puppeteer...');
  puppeteer.use(StealthPlugin());

  let browser: Browser;
  if (process.env.NODE_ENV === 'production') {
    browser = await puppeteer.launch({
      headless: false,
      executablePath: '/usr/bin/google-chrome',
      args: [
        '--no-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
      ],
    }); //in prod mode or docker
  } else {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: { width: 1200, height: 800 },
      // args: [
      //   '--remote-debugging-port=9222',
      //   '--remote-debugging-address=0.0.0.0',
      // ],
    }); //in dev mode
  }

  return browser;
};
