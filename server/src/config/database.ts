import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function connect() {
  try {
    await mongoose.connect(process.env.DB_URI || "");
    console.log("CONNECTED TO DB");
  } catch (err) {
    console.error("COULD NOT CONNECT TO DB");
    process.exit();
  }
}

export default connect;
