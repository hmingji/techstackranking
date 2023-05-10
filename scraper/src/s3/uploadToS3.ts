import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const client = new S3Client({ region: 'ap-southeast-1' });

export const uploadToS3 = async (key: string, body: string) => {
  const command = new PutObjectCommand({
    Bucket: 'techstackranking-scraped-data',
    Key: key,
    Body: body,
    ContentType: 'application/json',
  });

  try {
    const response = await client.send(command);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};
