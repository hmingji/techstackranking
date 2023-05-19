//added dotenv for local development
import dotenv from 'dotenv';
dotenv.config();

import { init } from './core';
import {
  Job,
  TechStack,
  computeTechStackCount,
  removeDuplicateJob,
} from '@techstack-ranking/database';
import nlp from 'compromise/three';
import { getKeywordTrie } from './core/trie';
import { getEntryLevelKeywords, getTechStackMap } from './core/keyword';
import { removeHTML } from './core/removeHTML';
import { getScrapedData } from './s3/getScrapedData';

async function main() {
  const keyFlagIdx = process.argv.indexOf('-k');
  if (keyFlagIdx <= -1) {
    console.log('No scraped data key provided, exiting...');
    return;
  }
  //get scraped data from s3
  const scraped = await getScrapedData(process.argv[keyFlagIdx + 1]);

  await init();

  const trie = getKeywordTrie();
  const entryKeywords = getEntryLevelKeywords();
  const techStackMap = getTechStackMap();
  const techStackKey = Array.from(techStackMap.keys());

  for (const item of scraped) {
    let isEntry = false;
    let techStacks: TechStack[] = [];
    let techStackIds: number[] = [];
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
      //special case: if normalPhrase is c, it could be c# or c++
      if (normalPhrase === 'c') {
        if (p[0].post.length >= 1 && p[0].post.slice(0, 1) === '#')
          normalPhrase = 'c#';
        else if (p[0].post.length >= 2 && p[0].post.slice(0, 2) === '++')
          normalPhrase = 'c++';
      }

      if (entryKeywords.includes(normalPhrase)) isEntry = true;
      if (techStackKey.includes(normalPhrase)) {
        const techstack = techStackMap.get(normalPhrase);
        if (techstack && !techStackIds.includes(techstack.id)) {
          techStackIds.push(techstack.id);
          techStacks.push(techstack);
        }
      }
    });

    const job = await Job.create({
      position: posTrimmed,
      company: comTrimmed,
      description: descTrimmed,
      entryLevel: isEntry,
    });

    if (job) {
      job.addTechStacks(techStacks);
    }
  }

  await removeDuplicateJob();
  await computeTechStackCount();
  console.log('All scraped content processed.');
}

main();
