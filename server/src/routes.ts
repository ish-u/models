import { Express, Request, Response } from "express";
import upload from "./config/multer";
import {
  getFilesHandler,
  uploadFileHandler,
} from "./controllers/files.controller";

function routes(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // FILE
  app.post("/upload", upload.single("file"), uploadFileHandler);
  app.get("/files", getFilesHandler);
}

export default routes;
