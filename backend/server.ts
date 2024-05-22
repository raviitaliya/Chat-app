import express from "express";
import env from "dotenv";
import ConnectDB from "./src/config/ConnectDB";
import router from "./src/routes/userRouter";
import cors from "cors";
import cookieParser from 'cookie-parser'
import {server,app} from './src/socket/index' 
env.config();


app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials : true,
}));

app.use(express.json());
app.use(cookieParser());

const connect = async () => {

  app.use("/api", router);

  await ConnectDB();
  const port = process.env.PORT || 4000;

  server.listen(port, () => {
    console.log(`App listening on port ${port}!`);
  });

};

connect();