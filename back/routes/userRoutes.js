import express from "express";
import { loginC } from "../controller/userController.js";

const userRoutes = express.Router();

userRoutes.route("/login").get(loginC);

export default userRoutes;
