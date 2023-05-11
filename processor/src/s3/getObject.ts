import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';

const client = new S3Client({ region: 'ap-southeast-1' });

export const scrapedDataBucket = 'techstackranking-scraped-data';

export const getObject = async (bucket: string, key: string) => {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  try {
    const response = await client.send(command);
    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
    const str = (await response.Body?.transformToString()) ?? '';
    //console.log(str);
    return str;
  } catch (err) {
    console.error(err);
  }
};
