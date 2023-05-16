import natural from 'natural';
const tokenizer = new natural.TreebankWordTokenizer();
console.log(
  tokenizer.tokenize(
    'tech stack include React.js, objective-c, travis ci, ci/cd and .NET.'
  )
);
