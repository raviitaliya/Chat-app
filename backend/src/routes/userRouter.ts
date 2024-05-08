import express from "express";
import { register } from "../controller/registerUser";
import { login } from "../controller/LoginUser";
import { UpdateUser } from "../controller/UpdateUser";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.put("/user", UpdateUser);

export default router;
