import express from "express";
import env from "dotenv";
import ConnectDB from "./src/config/ConnectDB";
import router from "./src/routes/userRouter";
import cors from "cors";
import cookieParser from 'cookie-parser'

env.config();
const app = express();

// Apply CORS middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials : true,
}));

app.use(express.json());
app.use(cookieParser());

const connect = async () => {
  // API endpoints
  app.use("/api", router);

  await ConnectDB();
  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
  });
};

connect();
