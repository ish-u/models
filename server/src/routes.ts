import { Express, Request, Response } from "express";
import upload from "./config/multer";
import {
  getFilesHandler,
  uploadFileHandler,
} from "./controllers/files.controller";
import {
  checkSessionHandler,
  loginHandler,
  logoutHandler,
  registerHandler,
} from "./controllers/user.controller";
import passport from "passport";
import { authenticate } from "./utils/authenticate";

function routes(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // SESSION
  app.get("/check", authenticate, checkSessionHandler);

  // USER
  app.post("/login", passport.authenticate("local"), loginHandler);
  app.post("/register", registerHandler);
  app.get("/logout", authenticate, logoutHandler);

  // FILE
  app.post("/upload", authenticate, upload.single("file"), uploadFileHandler);
  app.get("/files", authenticate, getFilesHandler);
}

export default routes;
