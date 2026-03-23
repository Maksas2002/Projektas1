import express from "express";
import { deleteMe } from "../controllers/userController.js";

const usersRouter = express.Router();

// usersRouter.route("/signup").post(signup);
// usersRouter.route("/login").post(login);
usersRouter.route("/me").delete(deleteMe);

export default usersRouter;
