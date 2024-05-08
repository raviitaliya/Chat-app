import { Request, Response } from "express";
import UserModel from "../Models/UserModel";
import bcrypt from "bcrypt";

const UpdateUser = async (req: Request, res: Response) => {
  let { _id } = req.body;

  if (!_id) {
    return res.status(400).json({
      message: "id is required",
    });
  }

  try {
    let user = await UserModel.findOne({ _id });

    if (user == null) {
      return res.status(400).json({
        message: "id is invalid",
      });
    }

    console.log(user);

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password
      ? await bcrypt.hash(req.body.password, 10)
      : user.password;
    user.profile_pic = req.body.profile_pic || user.profile_pic;

    await user.save();

    res.json({
      message: "user updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: "error updating user" });
  }
};

export { UpdateUser };
