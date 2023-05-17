import nlp from 'compromise/three';
import { getEntryLevelKeywords, getTechStackKeywords } from './keyword';

let trie: object;

export function buildKeywordTrie() {
  //   const entry = getEntryLevelKeywords();
  //   const techStack = getTechStackKeywords();
  //   const merged = techStack
  let keywords = getTechStackKeywords();
  getEntryLevelKeywords().forEach((k) => keywords.push(k));
  trie = nlp.buildTrie(keywords);
  return trie;
}

export function getKeywordTrie() {
  return trie;
}
