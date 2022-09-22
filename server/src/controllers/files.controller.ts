import { Request, Response } from "express";
import { GetObjectCommand, ListBucketsCommand } from "@aws-sdk/client-s3";
import { S3 } from "../config/aws";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import userModel from "../models/user.model";

export async function uploadFileHandler(req: Request, res: Response) {
  // Express.Multer.File doesn't have location,key etc types - FIX types
  const file: any = req.file;

  // Getting the user form username
  const username = (
    req.user as {
      username: string;
    }
  ).username;

  const user = await userModel.findOne({
    username: username,
  });

  // Saving the File as Filename->AWS_key key-value Pair
  if (user && file) {
    user.files?.set(
      (file.originalname as string).split(".")[0],
      (file.key as string).split(".")[0]
    );
    await user.save();
    res.status(201).send();
  }
  res.status(401).send();
}

export async function getFilesHandler(req: Request, res: Response) {
  try {
    // Getting the user from Username
    const username = (
      req.user as {
        username: string;
      }
    ).username;

    const user = await userModel.findOne({
      username: username,
    });

    // Sending the Files
    if (user?.files) {
      return res.json({ files: Array.from(user?.files.keys()) });
    }
    res.json({ files: [] });
  } catch (err) {
    console.log(err);
  }
}

export async function getBucketsHandler(req: Request, res: Response) {
  try {
    const data = await S3.send(new ListBucketsCommand({}));
    res.send(data.Buckets);
  } catch (err) {
    console.log(err);
  }
}

export async function getFileHandler(req: Request, res: Response) {
  try {
    // filename
    const fileName = req.params.fileName;
    // getting the AWS Key for file using the filename
    const username = (
      req.user as {
        username: string;
      }
    ).username;
    const path = (
      await userModel.findOne({
        username: username,
      })
    )?.files.get(fileName);

    // creating the presigned url
    const url = await getSignedUrl(
      S3,
      new GetObjectCommand({
        Bucket: process.env.BUCKET,
        Key: path + ".glb",
      }),
      {
        expiresIn: 300,
      }
    );
    // res.redirect(url);

    res.json({ url: url });
  } catch (err) {
    console.log(err);
  }
}
