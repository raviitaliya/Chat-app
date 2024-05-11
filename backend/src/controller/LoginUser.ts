import { Request, Response } from "express";
import UserModel from "../Models/UserModel";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";



const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    res.cookie("login","hello")
    if (!email || !password) {
      return res.status(400).json({ msg: "Please fill all the fields." });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist." });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    const tokenData = {
      id: user._id,
      email: user.email,
    };

    const token = await Jwt.sign(
      tokenData,
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "30d",
      }
    );

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials." });
    }

    res.cookie("jwt",token);
   
    return res
      .status(200)
      .json({ msg: "user login sucessfull",token});
  } catch (error) {
    res.status(500).json({ msg: "error while logging in user." });
    console.log(error);
  }
};
export { login };
