import express from "express";
import { deleteMe } from "../controllers/userController.js";

const usersRouter = express.Router();

usersRouter.route("/me").delete(deleteMe);

export default usersRouter;
