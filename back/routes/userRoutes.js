import express from "express";
import { loginC, signup, logoutC, protect } from "../controller/userController.js";
import userLogin from "../validation/userLoginV.js"
import validate from "../validation/validate.js";

const userRoutes = express.Router();

userRoutes.route("/logout").get(protect, logoutC);
userRoutes.post("/signup", signup);
userRoutes.route("/login").post(userLogin, validate, loginC);

export default userRoutes;
