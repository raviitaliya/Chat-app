import express from "express";
import { register } from "../controller/registerUser";
import { login } from "../controller/LoginUser";
import { UpdateUser } from "../controller/UpdateUser";
import { userDetails } from "../controller/getUserDetails";
import { searchUser } from "../controller/SearchUser";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.put("/update-User", UpdateUser);

router.get("/user-details", userDetails);

router.get("/search/:key", searchUser);



export default router;
