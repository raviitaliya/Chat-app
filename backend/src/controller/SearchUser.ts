import { Request, Response } from "express";
import UserModel from "../Models/UserModel";

const searchUser = async(req: Request, res: Response) => {

    let data = await UserModel.find({
        "$or":[
            {"name" : {$regex: req.params.key}}
        ]
    }).select("-password")

    res.status(200).json(data);
};

export { searchUser };
