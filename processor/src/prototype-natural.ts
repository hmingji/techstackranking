import natural, { Trie } from 'natural';

//build trie using all keywords stored in db inside trie folder
//build entryLevel trie using following keywords
//entry, fresh, junior, self-taught, self-learn, fresh-graduate
//tokenize

const tokenizer = new natural.TreebankWordTokenizer();
const trie = new Trie(false);
trie.addStrings(['fresh graduate', '.net', 'docker']);
// console.log(
//   trie.keysWithPrefix(
//     'tech stack include React.js, objective-c, travis ci, ci/cd and .NET and fresh graduate.'
//   )
// );
const tokens = tokenizer.tokenize(
  'tech stack include React.js, objective-c, travis ci, ci/cd, .NET and fresh graduate.'
);
const matched: string[] = [];
for (const token of tokens) {
  if (trie.contains(token)) matched.push(token);
}
console.log(matched);
// console.log(trie.contains('tech'));
// console.log(
//   tokenizer.tokenize(
//     'tech stack include React.js, objective-c, travis ci, ci/cd and .NET and fresh graduate.'
//   )
// );
