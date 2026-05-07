import express from "express";
import {
  loginC,
  signup,
  getAllUsers,
  logoutC,
  updateUserC,
  deleteMe,
  getMyBudgets,
} from "../controller/userController.js";

import {
  createIncomeC,
  getIncomeByIdC,
  updateIncomeC,
  deleteIncome,
  totalMonthlyIncomeC
} from "../controller/incomeController.js";

import { userMonthlyBalanceC } from "../controller/userBalanceController.js";

import {
  createExpenseC,
  deleteExpenseC,
  expensesByCategoryD,
  getExpenseByIdC,
  updateExpense,
  totalMonthlyExpensesC,
  getTotalExpensesByPeriodC
} from "../controller/expensesController.js";

import { userCombinedHistoryC } from "../controller/userHistoryController.js";
import { getMonthlyChartDataC } from "../controller/chartController.js";

import userLogin from "../validation/userLoginV.js";
import userSignUp from "../validation/userSignup.js";
import incomeVal from "../validation/incomeVal.js";
import expenseEdit from "../validation/expenseEdit.js";
import validate from "../validation/validate.js";
import restrictToOwnUser from "../middleware/restrictToOwnerUser.js";
import { allowAccessTo } from "../middleware/allowAcceesTo.js";
import { authProtect } from "../middleware/authProtect.js";
import { expensesByCategory } from "../validation/expensesByCategory.js";
import { exportExpenses } from "../controller/exportController.js";
import { exportExpensesVal } from "../validation/exportExpensesVal.js";

const userRoutes = express.Router();

userRoutes.post("/signup", userSignUp, validate, signup);
userRoutes.post("/login", userLogin, validate, loginC);

userRoutes.use(authProtect);

userRoutes.get("/", getAllUsers);
userRoutes.get("/logout", logoutC);
userRoutes.patch("/edit", updateUserC);
userRoutes.delete("/me", deleteMe);

userRoutes.get("/my-budgets", allowAccessTo("User"), getMyBudgets);
userRoutes.get("/history", allowAccessTo("User"), userCombinedHistoryC);
userRoutes.get("/charts/monthly", allowAccessTo("User"), getMonthlyChartDataC);

userRoutes.post("/:id/income/add", allowAccessTo("User"), restrictToOwnUser, incomeVal, validate, createIncomeC);
userRoutes.get("/:id/income/:incomeId", allowAccessTo("User"), restrictToOwnUser, getIncomeByIdC);
userRoutes.patch("/:id/income/:incomeId", allowAccessTo("User"), restrictToOwnUser, updateIncomeC);
userRoutes.delete("/:id/income/delete/:incomeId", allowAccessTo("User"), restrictToOwnUser, deleteIncome);

userRoutes.post("/:id/expenses/add", allowAccessTo("User"), restrictToOwnUser, validate, createExpenseC);
userRoutes.get("/:id/expense/:expenseId", allowAccessTo("User"), restrictToOwnUser, getExpenseByIdC);
userRoutes.patch("/:id/expenses/edit/:expenseId", allowAccessTo("User"), restrictToOwnUser, expenseEdit, validate, updateExpense);
userRoutes.delete("/:id/expenses/delete/:expenseId", allowAccessTo("User"), restrictToOwnUser, deleteExpenseC);

userRoutes.get("/:id/expenses/byCategory", allowAccessTo("User"), expensesByCategory, validate, expensesByCategoryD);
userRoutes.get("/:date/totalIncome", allowAccessTo("User"), totalMonthlyIncomeC);
userRoutes.get("/:date/totalExpenses", allowAccessTo("User"), totalMonthlyExpensesC);
userRoutes.get("/:date/totalBalance", allowAccessTo("User"), userMonthlyBalanceC);
userRoutes.get("/expenses/total-by-period", allowAccessTo("User"), getTotalExpensesByPeriodC);
userRoutes.get("/expenses/export", allowAccessTo("User"), exportExpensesVal, validate, exportExpenses);



//exports a expanses csv
userRoutes.get(
  "/expenses/export",
  authProtect,
  allowAccessTo("User"),
  exportExpensesVal,
  validate,
  exportExpenses
);

export default userRoutes;
