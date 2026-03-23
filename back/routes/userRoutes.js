import express from "express";
import { loginC } from "../controller/userController.js";

const userRoutes = express.Router();

userRoutes.route("/login").post(loginC);

export default userRoutes;
