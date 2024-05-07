import express from "express";
import env from "dotenv";
const app = express();
import ConnectDB from "./config/ConnectDB";

env.config();


const connect = async () => {
  await ConnectDB();
  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`app listening on port ${port}!`);
  });
};

connect();
