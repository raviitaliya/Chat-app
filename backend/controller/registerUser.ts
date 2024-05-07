import { Request, Response } from "express";
import UserModel from "../Models/UserModel";

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, profile_pic } = req.body;

    const checkEmail = await UserModel.findOne({ email });

    if(checkEmail){
        return res.status(400).json({msg: "Email already exists."})
    }
    

  } catch (error) {}
};
