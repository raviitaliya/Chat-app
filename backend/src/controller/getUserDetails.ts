import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel";

const userDetails = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ msg: "No token provided" ,logout: true });
    }

    const tokenData = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as { id: string };

    if (!tokenData.id) {
      return res.status(401).json({ msg: "Invalid token" });
    }

    const user = await UserModel.findById(tokenData.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error while getting user." });
  }
};

export { userDetails };
