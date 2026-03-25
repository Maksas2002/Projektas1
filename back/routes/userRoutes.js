import express from "express";
import { loginC, signup } from "../controller/userController.js";
import userLogin from "../validation/userLoginV.js"
import validate from "../validation/validate.js";
import userSignUp from "../validation/userSignup.js";

const userRoutes = express.Router();

userRoutes.route("/signup").post(userSignUp, validate, signup);

userRoutes.route("/login").post(userLogin, validate, loginC);

export default userRoutes;
