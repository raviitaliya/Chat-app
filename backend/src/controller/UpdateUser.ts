import { Request, Response } from "express";
import UserModel from "../Models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UpdateUser = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token || "";

    if (!token) {
      return res.status(401).json({ msg: "No token provided" });
    }

    let tokenData;
    try {
      tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
        id: string;
      };
    } catch (error) {
      return res.status(401).json({ msg: "Invalid token" });
    }

    if (!tokenData.id) {
      return res.status(401).json({ msg: "Invalid token" });
    }

    const user = await UserModel.findById(tokenData.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }
    user.profile_pic = req.body.profile_pic || user.profile_pic;

    await user.save();

    res.json({
      message: "User updated successfully",
      success : true,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
};

export { UpdateUser };
