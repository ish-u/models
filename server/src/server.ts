import express from "express";
import { Express } from "express";
import cors from "cors";

// ENV Variables
import dotenv from "dotenv";
dotenv.config();

// Express App
const app: Express = express();

// MIDDLEWARE
app.use(
  cors({
    origin: ["http://localhost:5173", process.env.FRONTEND || ""],
  })
);
app.use(express.static("public"));

export default app;
