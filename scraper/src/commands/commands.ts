import { Command } from './executeCommands';

export const indeedsgCommands: Command[] = [
  {
    action: 'visitUrl',
    url: 'https://sg.indeed.com/',
  },
  {
    action: 'click',
    selector: '#onetrust-reject-all-handler',
  },
  {
    action: 'sleep',
    ms: 2000,
  },
  {
    action: 'type',
    selector: '#text-input-what',
    text: 'software engineer',
  },
  {
    action: 'press',
    key: 'Enter',
  },
  {
    action: 'sleep',
    ms: 3000,
  },
  {
    action: 'click',
    selector: '.icl-Modal-Close',
  },
  {
    action: 'sleep',
    ms: 2000,
  },
  {
    action: 'loop',
    loopOption: {
      iterateBy: 'loopAmount',
      loopAmount: 2,
    },
    commands: [
      {
        action: 'click',
        selector: '.jobsearch-ResultsList > li:nth-child(::i) a',
      },
      {
        action: 'sleep',
        ms: 2000,
      },
      {
        action: 'extract',
        extractMap: new Map<string, string>([
          ['description', '#jobDescriptionText'],
        ]),
      },
    ],
  },
  {
    action: 'sleep',
    ms: 3000,
  },
];
