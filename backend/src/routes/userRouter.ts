import express from "express";
import { register } from "../controller/registerUser";
import { login } from "../controller/LoginUser";
import { UpdateUser } from "../controller/UpdateUser";
import { userDetails } from "../controller/getUserDetails";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.put("/update-User", UpdateUser);

router.get("/user-details", userDetails);


export default router;
