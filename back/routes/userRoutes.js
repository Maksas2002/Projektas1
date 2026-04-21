import express from "express";
import {
  loginC,
  signup,
  getAllUsers,
  logoutC,
  updateUserC,
  deleteMe,
} from "../controller/userController.js";
import { createIncomeC, getIncomeByIdC, updateIncomeC, deleteIncome } from "../controller/incomeController.js";
// NAUJAS IMPORTAS:
import { createExpenseC, deleteExpenseC, updateExpense } from "../controller/expensesController.js";

// import { createExpenseC} from "../controller/expensesController.js";

import { userCombinedHistoryC } from "../controller/userHistoryController.js";
import userLogin from "../validation/userLoginV.js";
import userSignUp from "../validation/userSignup.js";
import incomeVal from "../validation/incomeVal.js";
import expenseEdit from "../validation/expenseEdit.js";
import validate from "../validation/validate.js";
import restrictToOwnUser from "../middleware/restrictToOwnerUser.js";
import { allowAccessTo } from "../middleware/allowAcceesTo.js";
import { authProtect } from "../middleware/authProtect.js";

const userRoutes = express.Router();

// --- BAZINIAI VARTOTOJO MARŠRUTAI ---
userRoutes.get("/", authProtect, getAllUsers);
userRoutes.get("/logout", authProtect, logoutC);
userRoutes.post("/signup", userSignUp, validate, signup);
userRoutes.post("/login", userLogin, validate, loginC);
userRoutes.patch("/edit", authProtect, updateUserC);
userRoutes.route("/me").delete(authProtect, deleteMe);

// --- PAJAMOS (INCOME) ---
userRoutes.post(
  "/:id/income/add",
  authProtect,
  allowAccessTo("User"),
  restrictToOwnUser,
  incomeVal,
  validate,
  createIncomeC,
);

// get income by id
userRoutes.get(
  "/:id/income/:incomeId",
  authProtect,
  allowAccessTo("User"),
  restrictToOwnUser,
  getIncomeByIdC
);

// update income
userRoutes.patch(
  "/:id/income/:incomeId",
  authProtect,
  allowAccessTo("User"),
  restrictToOwnUser,
  updateIncomeC
);


//delete
userRoutes.delete("/:id/income/delete/:incomeId", authProtect, allowAccessTo("User"), restrictToOwnUser, deleteIncome);

// --- IŠLAIDOS (EXPENSES) ---
userRoutes.post(
  "/:id/expenses/add",
  authProtect,
  allowAccessTo("User"),
  restrictToOwnUser,
  validate,
  createExpenseC,
);
userRoutes.delete(
  "/:id/expenses/delete/:expenseId",
  authProtect,
  allowAccessTo("User"),
  restrictToOwnUser,
  deleteExpenseC,
);
userRoutes.patch("/:id/expenses/edit/:expenseId", authProtect, allowAccessTo("User"), restrictToOwnUser, expenseEdit, validate, updateExpense);

// user expense and income history

userRoutes.get(
  "/history",
  authProtect,
  allowAccessTo("User"),
  userCombinedHistoryC
);

export default userRoutes;