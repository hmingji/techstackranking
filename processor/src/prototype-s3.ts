import { ScrapedContent } from 'models/ScrapedContent';
import { getObject, scrapedDataBucket } from './s3/getObject';

async function main() {
  const str = await getObject(
    scrapedDataBucket,
    'scrap-data-2023-05-11T08:57:11.747Z' // object key, to be received from job request
  );
  let obj: ScrapedContent[] = [];
  if (str) obj = JSON.parse(str);
  console.log(obj);
}
main();
