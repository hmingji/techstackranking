import nlp from 'compromise/three';

let trie = nlp.buildTrie([
  'docker',
  'fresh graduate',
  'react.js',
  'react',
  'travis',
]);

const doc = nlp(
  'tech stack include React.js, objective-c, travis!!! ci, ci/cd, .NET and fresh graduate.'
);

let m = doc.lookup(trie);
const res = m.docs.map((p) => {
  let res = '';
  for (let i = 0; i < p.length; i++) {
    if (i !== 0) res += ' ';
    res += p[i].normal;
  }
  return res;
});
//build a map keyword map to category object
console.log(res);
