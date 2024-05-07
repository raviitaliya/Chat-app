import { Request, Response } from "express";
import express from "express";
import env from "dotenv";
const app = express();
import connectDB from "./config/ConnectDB";

env.config();

app.use(express.json());


const connect = async () => {
  await connectDB();
  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`app listening on port ${port}!`);
  });
};

connect();
