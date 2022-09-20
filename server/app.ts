import { Request, Response, Express } from "express";
import express from "express";
import cors from "cors";
import fs from "fs/promises";

// ENV Variables
import dotenv from "dotenv";
import { time } from "console";
dotenv.config();

// Express App
const app: Express = express();

// PORT
const port = process.env.PORT;

// MIDDLEWARE
app.use(cors());
app.use(express.static("public"));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("HELLO");
});

app.get("/files", async (req: Request, res: Response) => {
  const files = await fs.readdir("./public");
  res.json({ files });
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}.`);
});
