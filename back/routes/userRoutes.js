import express from "express";
import { loginC, signup, updateUserC } from "../controller/userController.js";
import userLogin from "../validation/userLoginV.js"
import validate from "../validation/validate.js";
import { authProtect } from "../middleware/authProtect.js";

const userRoutes = express.Router();

userRoutes.post("/signup", signup);
userRoutes.route("/login").get(userLogin, validate, loginC);
userRoutes.patch("/edit", authProtect, updateUserC);

export default userRoutes;
