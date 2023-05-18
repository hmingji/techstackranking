import nlp from 'compromise/three';
import { getEntryLevelKeywords, getTechStackKeywords } from './keyword';

let trie: object;

export function buildKeywordTrie() {
  let keywords = getTechStackKeywords();
  getEntryLevelKeywords().forEach((k) => keywords.push(k));
  trie = nlp.buildTrie(keywords);
  return trie;
}

export function getKeywordTrie() {
  return trie;
}
