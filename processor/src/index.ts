import { init } from './core';
import testData from './testdata/test01.json';
import { Job, TechStack } from '@techstack-ranking/database';
import nlp from 'compromise/three';
import { getKeywordTrie } from './core/trie';
import { getEntryLevelKeywords, getTechStackMap } from './core/keyword';
import { removeHTML } from 'core/removeHTML';

async function main() {
  await init();
  const scraped = testData;
  const trie = getKeywordTrie();
  const entryKeywords = getEntryLevelKeywords();
  const techStackMap = getTechStackMap();
  const techStackKey = Array.from(techStackMap.keys());

  for (const item of scraped) {
    //perform text transform
    let isEntry = false;
    let techStacks: TechStack[] = [];
    const posTrimmed = removeHTML(item.position);
    const comTrimmed = removeHTML(item.company);
    const descTrimmed = removeHTML(item.description);

    const posDoc = nlp(posTrimmed);
    const posRes = posDoc.lookup(trie);
    posRes.docs.forEach((p) => {
      let normalPhrase = '';
      for (let i = 0; i < p.length; i++) {
        if (i !== 0) normalPhrase += ' ';
        normalPhrase += p[i].normal;
      }
      console.log(normalPhrase);
      if (entryKeywords.includes(normalPhrase)) isEntry = true;
    });

    const descDoc = nlp(descTrimmed);
    const descRes = descDoc.lookup(trie);
    descRes.docs.forEach((p) => {
      let normalPhrase = '';
      for (let i = 0; i < p.length; i++) {
        if (i !== 0) normalPhrase += ' ';
        normalPhrase += p[i].normal;
      }
      if (entryKeywords.includes(normalPhrase)) isEntry = true;
      if (techStackKey.includes(normalPhrase)) {
        const techstack = techStackMap.get(normalPhrase);
        if (techstack && !techStacks.includes(techstack)) {
          techStacks.push(techstack);
        }
      }
    });

    // const job = await Job.create({
    //   position: item.position,
    //   company: item.company,
    //   description: item.description,
    //   entryLevel: isEntry,
    // });
    // if (job) {
    //   job.addTechStacks(techStacks);
    // }

    //check duplicate
    //compute tech stack count
    console.log('saved item');
  }
}

main();
