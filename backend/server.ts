import express from "express";
import env from "dotenv";
const app = express();
import ConnectDB from "./src/config/ConnectDB";
import router from "./src/routes/userRouter";

env.config();
app.use(express.json());

const connect = async () => {
  //api endpoint

  app.use("/api", router);
  

  await ConnectDB();
  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`app listening on port ${port}!`);
  });
};

connect();
