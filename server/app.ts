import { Request, Response, Express } from "express";
import express from "express";
import cors from "cors";
import fs from "fs/promises";

// MULTER
import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.originalname.split(".")[0] +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".")[1]
    );
  },
});

const upload = multer({ storage: storage });

// ENV Variables
import dotenv from "dotenv";
dotenv.config();

// Express App
const app: Express = express();

// PORT
const port = process.env.PORT;

// MIDDLEWARE
app.use(
  cors({
    origin: ["http://localhost:5173", process.env.FRONTEND || ""],
  })
);
app.use(express.static("public"));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("HELLO");
});

// Uplaod File
app.post("/upload", upload.single("file"), (req, res) => {
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
});

app.get("/files", async (req: Request, res: Response) => {
  const files = await fs.readdir("./public");
  res.json({ files });
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}.`);
});
