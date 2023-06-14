import { KeyInput } from 'puppeteer';

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
  extractMap?: Map<string, string>; //property name => selector
  //extractMap?: string[][]; // [...[property name, selector]]
  loopOption?: Omit<executeOption, 'loopOver'>; // define loop behavior
  ms?: number; // millis for sleep action
};

export type RawCommand = {
  action:
    | 'visitUrl'
    | 'click'
    | 'press'
    | 'type'
    | 'extract'
    | 'loop'
    | 'sleep';
  selector?: string; // target node for action click, type
  commands?: RawCommand[] | Command[]; // list of commands to loop over
  url?: string; // url to visit
  text?: string; // provide the text to type
  key?: KeyInput; // provide the key to press
  //extractMap?: Map<string, string>; //property name => selector
  extractMap?: string[][] | any; //property name => selector
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

export const indeedsgCommands: RawCommand[] = [
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
      iterateBy: 'selector',
      loopEndSelector: '.jobsearch-LeftPane > nav > div:nth-child(7) > a',
      notFoundAsLoopEnd: true,
    },
    commands: [
      {
        action: 'loop',
        loopOption: {
          iterateBy: 'loopAmount',
          loopAmount: 17,
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
            extractMap: [
              ['position', '.jobsearch-JobInfoHeader-title'],
              ['company', '.jobsearch-CompanyInfoContainer a'],
              ['description', '#jobDescriptionText'],
            ],
          },
        ],
      },
      {
        action: 'click',
        selector: 'div.jobsearch-LeftPane > nav > div:last-child > a',
      },
      {
        action: 'sleep',
        ms: 4000,
      },
      {
        action: 'press',
        key: 'Enter',
      },
      {
        action: 'sleep',
        ms: 1000,
      },
    ],
  },
  {
    action: 'sleep',
    ms: 3000,
  },
];
