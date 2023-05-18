import nlp from 'compromise/three';

//test trie on c# and c++ and c
const trie = nlp.buildTrie(['c#', 'c', 'c++']);
const doc =
  nlp(`Today, Seventh Sense’s Face Recognition engine accuracy is ranked amongst the top in NIST, LFW, IJB-C, and other industry benchmarks and we are proudly partnered with leading industry associations such as OpenCV.
`);
const res = doc.lookup(trie);
res.docs.forEach((p) => {
  let normalPhrase = '';
  for (let i = 0; i < p.length; i++) {
    if (i !== 0) normalPhrase += ' ';
    normalPhrase += p[i].normal;
  }
  //special case: if normalPhrase is c, it could be c# or c++
  if (normalPhrase === 'c') {
    if (p[0].post.length >= 1 && p[0].post.slice(0, 1) === '#')
      normalPhrase = 'c#';
    if (p[0].post.length >= 2 && p[0].post.slice(0, 2) === '++')
      normalPhrase = 'c++';
  }
  console.log(normalPhrase);
});
console.log(res.docs);
