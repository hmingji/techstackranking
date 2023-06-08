import { sleep } from './sleep';
import { KeyInput, Page } from 'puppeteer';

export type Command = {
  action:
    | 'visitUrl'
    | 'click'
    | 'press'
    | 'type'
    | 'extract'
    | 'loop'
    | 'sleep';
  selector?: string; // target node for action click, type
  commands?: Command[]; // list of commands to loop over
  url?: string; // url to visit
  text?: string; // provide the text to type
  key?: KeyInput; // provide the key to press
  // extractMap?: Map<string, string>; //property name => selector
  extractMap?: string[][]; //property name => selector
  loopOption?: Omit<executeOption, 'loopOver'>; // define loop behavior
  ms?: number; // millis for sleep action
};

export type executeOption = {
  loopOver: Boolean;
  iterateBy?: 'loopAmount' | 'selector';
  loopAmount?: number;
  loopEndSelector?: string; // dom node that indicate loop end
  notFoundAsLoopEnd?: Boolean; // dom node not found as loop end
};

export async function executeCommands(
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
        const endNode = await page.evaluate((s) => {
          return document.querySelector(s) ? true : false;
        }, loopEndSelector!);
        console.log('evaluating node exist: ', endNode);
        const endNodeNotFound = endNode ? false : true;
        if (notFoundAsLoopEnd === endNodeNotFound) break;
      } else {
        if (loopCount === loopAmount) break;
      }
      console.log('loopOver, reseting command index');
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
        break;
      }

      case 'press': {
        await page.keyboard.press(commands[i].key!);
        break;
      }

      case 'sleep': {
        await sleep(commands[i].ms!);
        break;
      }

      case 'click': {
        while (page.url().includes('viewjob')) {
          await page.goBack({ waitUntil: 'networkidle0' });
        } //could be removed
        const selector =
          iterateBy && iterateBy === 'loopAmount'
            ? commands[i].selector!.replace('::i', loopCount.toString())
            : commands[i].selector!;
        console.log(`click, action number: ${i}, selector ${selector}`);

        const node = await page.evaluate((s) => {
          return document.querySelector(s);
        }, selector);

        console.log(`clicking target node: ${node}`);

        if (node !== null) page.click(selector);
        break;
      }

      case 'extract': {
        console.log(`extract, action number: ${i}`);

        let content: Record<string, string> = {};
        commands[i].extractMap!.forEach(async (e) => {
          const text = await page.evaluate((s) => {
            return document.querySelector(s)?.innerHTML;
          }, e[1]);
          content[e[0]] = text ?? '';
        });
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
