import {
  CreateBucketCommand,
  ListBucketsCommand,
  PutBucketCorsCommand,
  PutPublicAccessBlockCommand,
  S3Client,
} from "@aws-sdk/client-s3";

// S3
export const S3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

// Check if S3 Bucket exists or not -> If not create it
const createBucket = async () => {
  try {
    const buckets = (await S3.send(new ListBucketsCommand({}))).Buckets?.map(
      (bucket) => bucket.Name
    );
    if (!buckets?.includes(process.env.BUCKET)) {
      const bucket = await S3.send(
        new CreateBucketCommand({
          Bucket: process.env.BUCKET,
        })
      );
      console.log("BUCKET CREATED", bucket);

      // configuring public access
      const access = await S3.send(
        new PutPublicAccessBlockCommand({
          Bucket: process.env.BUCKET || "",
          PublicAccessBlockConfiguration: {
            BlockPublicAcls: true,
            BlockPublicPolicy: true,
            IgnorePublicAcls: true,
            RestrictPublicBuckets: true,
          },
        })
      );

      console.log("ACCESS CONTROL",access);

      // configure CORS
      const corsConfig = await S3.send(
        new PutBucketCorsCommand({
          Bucket: process.env.BUCKET || "",
          CORSConfiguration: {
            CORSRules: [
              {
                AllowedHeaders:[],
                AllowedMethods: ["GET"],
                AllowedOrigins: [
                  process.env.DEV === "TRUE"
                    ? "http://localhost:5173"
                    : process.env.FRONTEND || "",
                ],
                ExposeHeaders:[]
              },
            ],
          },
        })
      );

      console.log("CORS",corsConfig)
    }
  } catch (err) {
    console.error(err);
    process.exit(1)
  }
};
createBucket();
