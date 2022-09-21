import { Request, Response } from "express";
import fs from "fs/promises";
export async function uploadFileHandler(req: Request, res: Response) {
  const file: Express.Multer.File | undefined = req.file;
  if (file) {
    const file_meta_data = {
      name: file.originalname,
      type: file.mimetype,
      size: file.size,
    };
    res.status(201).send(file_meta_data);
  }
  res.status(401).send();
}

export async function getFilesHandler(req: Request, res: Response) {
  const files = await fs.readdir("./public");
  console.log("FILES");
  res.json({ files });
}
