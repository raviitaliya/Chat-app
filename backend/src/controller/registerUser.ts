import { Request, Response } from "express";
import UserModel from "../Models/UserModel";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, profile_pic } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please fill all the fields." });
    }

    const checkEmail = await UserModel.findOne({ email });

    //email verification
    if (checkEmail) {
      return res.status(400).json({ msg: "Email already exists." });
    }

    //password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = await UserModel.create({
        name,
        email,
        password: hashedPassword,
        profile_pic,
      });
    } catch (error) {
      res.status(500).json({ msg: "all filds are require.." });

      console.log(error);
    }
    res.status(200).json({ msg: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ msg: "error while creating user.." });
    console.log(error);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
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
        expiresIn: "1d",
      }
    );

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials." });
    }
    return res
      .cookie("token", token)
      .status(200)
      .json({ msg: "User logged in successfully." });
  } catch (error) {
    res.status(500).json({ msg: "error while logging in user." });
    console.log(error);
  }
};
export { register, login };
