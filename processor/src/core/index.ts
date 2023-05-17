import { buildTechStackMap, loadTechStackKeywords } from './keyword';
import { buildKeywordTrie } from './trie';

export async function init() {
  try {
    await loadTechStackKeywords();
    await buildTechStackMap();
    buildKeywordTrie();
    console.log('Initialize components completed');
  } catch (err) {
    console.log('Error occur while initializing', err);
  }
}
