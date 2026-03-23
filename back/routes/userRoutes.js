import express from "express";
import { loginC, signup } from "../controller/userController.js";

const userRoutes = express.Router();

userRoutes.post("/signup", signup);

userRoutes.route("/login").get(loginC);

export default userRoutes;
