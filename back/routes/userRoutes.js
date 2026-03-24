import express from "express";
import { loginC, signup } from "../controller/userController.js";
import userLogin from "../validation/userLoginV.js"
import validate from "../validation/validate.js";

const userRoutes = express.Router();

userRoutes.post("/signup", signup);

userRoutes.route("/login").get(userLogin, validate, loginC);

export default userRoutes;
