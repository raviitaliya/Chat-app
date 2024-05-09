import mongoose, { connection } from "mongoose";

const ConnectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("connected to mongodb.");
    });

    mongoose.connection.on("error", () => {
      console.log("data base connnection error.");
    });

    const connect = await mongoose.connect(
      process.env.MONGODB_URL as string
    );
  } catch (error) {
    console.log("error while DB connection", error);
  }
};

export default ConnectDB;
