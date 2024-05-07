import mongoose, { connection } from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL as string);

    connection.on("connected", () => {
      console.log("database connected");
    });
    connection.on("error", (error) => {
      console.log("error while DB connection", error);
    });
  } catch (error) {
    console.log("error while DB connection", error);
  }
};

export default connectDB;
