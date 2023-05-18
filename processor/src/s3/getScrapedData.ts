import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';

const client = new S3Client({ region: 'ap-southeast-1' });

const scrapedDataBucket = process.env.S3_BUCKET ?? '';

export type ScrapedData = {
  position: string;
  company: string;
  description: string;
};

export const getObject = async (bucket: string, key: string) => {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  try {
    const response = await client.send(command);
    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
    const str = (await response.Body?.transformToString()) ?? '';
    return str;
  } catch (err) {
    console.error(err);
  }
};

export async function getScrapedData(key: string) {
  const str = await getObject(scrapedDataBucket, key);
  let obj: ScrapedData[] = [];
  if (str) obj = JSON.parse(str);
  return obj;
}
