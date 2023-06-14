import { Command, executeOption } from './commands';
import { sleep } from './sleep';
import { Page } from 'puppeteer';

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
        const endNode = await page.$(loopEndSelector!);
        console.log('evaluating node exist: ', endNode);
        const endNodeNotFound = endNode ? false : true;
        await endNode?.dispose();
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
        try {
          console.log(`visiting Url...`);
          await page.goto(commands[i].url!, { waitUntil: 'networkidle0' });
          console.log('visit ended');
          break;
        } catch (err) {
          console.log('visit url error ', err);
          break;
        }
      }

      case 'type': {
        try {
          console.log(`typing...`);
          await page.type(commands[i].selector!, commands[i].text!);
          console.log('type ended');
          break;
        } catch (err) {
          console.log('typing err ', err);
          break;
        }
      }

      case 'press': {
        try {
          console.log('pressing...');
          await page.keyboard.press(commands[i].key!);
          console.log('press ended');
          break;
        } catch (err) {
          console.log('press error ', err);
          break;
        }
      }

      case 'sleep': {
        try {
          console.log('sleeping...');
          await sleep(commands[i].ms!);
          console.log('sleep ended');
          break;
        } catch (err) {
          console.log('sleep error ', err);
          break;
        }
      }

      case 'click': {
        try {
          console.log('clicking...');
          const selector =
            iterateBy && iterateBy === 'loopAmount'
              ? commands[i].selector!.replace('::i', loopCount.toString())
              : commands[i].selector!;
          console.log(`clicking..., selector: ${selector}`);

          await page.click(selector);
          console.log('click ended');
          break;
        } catch (err) {
          console.log(`clicking error: ${err}`);
          break;
        }
      }

      case 'extract': {
        try {
          console.log(`extracting...`);
          let content: Record<string, string> = {};

          commands[i].extractMap!.forEach(async (val, key) => {
            const node = await page.$(val);
            const text = await page.evaluate((n) => n?.innerHTML, node);
            content[key] = text ?? '';
            await node?.dispose();
          });
          extractedContentList.push(content);
          console.log('extract ended');
          break;
        } catch (err) {
          console.log(`Extracting error ${err}`);
          break;
        }
      }

      case 'loop': {
        try {
          console.log(`looping`);
          const extractedInLoop = await executeCommands(
            page,
            commands[i].commands!,
            {
              loopOver: true,
              ...commands[i].loopOption!,
            }
          );
          extractedInLoop.forEach((i) => extractedContentList.push(i));
          console.log('loop ended');
          break;
        } catch (err) {
          console.log('loop err ', err);
          break;
        }
      }
    }
    i += 1;
  }
  console.log(`total scraped length: ${extractedContentList.length}`);
  return extractedContentList;
}
