import multer from "multer";
import multerS3 from "multer-s3";
import { S3 } from "./aws";
import { Request } from "express";

const upload = multer({
  storage: multerS3({
    s3: S3,
    bucket: process.env.BUCKET || "",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req: Request, file, cb) {
      const username = (
        req.user as {
          username: string;
        }
      ).username;
      cb(null, username + "/" + Date.now() + file.originalname);
    },
  }),
});

export default upload;
