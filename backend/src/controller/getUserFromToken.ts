import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel";

const userDetails = async (token: string) => {
  try {

    if (!token) {
      return console.log("token not found");
      
    }

    const tokenData = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as { id: string };

    if (!tokenData.id) {
      return console.log("Invalid token");
      
    }

    const user = await UserModel.findById(tokenData.id).select("-password");

    if (!user) {
      return console.log("invalid user");
    }

    return user;
    
  } catch (error) {
    console.error(error);
   
  }
};

export { userDetails };
