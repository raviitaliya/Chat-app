import { Request, Response } from "express";
import UserModel from "../Models/UserModel";
import bcrypt from "bcrypt"


const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, profile_pic } = req.body;

    const checkEmail = await UserModel.findOne({ email });

    //email verification
    if(checkEmail){
        return res.status(400).json({msg: "Email already exists."})
    }

    //password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    


  } catch (error) {}
};
