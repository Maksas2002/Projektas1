import express from "express";
import {
  loginC,
  signup,
  getAllUsers,
  logoutC,
  updateUserC,
  deleteMe,
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
  totalMonthlyExpensesC 
} from "../controller/expensesController.js";
import { userCombinedHistoryC } from "../controller/userHistoryController.js";
import { getRemainingBudgetC, getUserBudgets } from "../controller/budgetController.js";

// Validacijos ir Middleware
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

// 1. Vieši maršrutai
userRoutes.post("/signup", userSignUp, validate, signup);
userRoutes.post("/login", userLogin, validate, loginC);

// 2. Apsauga
userRoutes.use(authProtect);

// Vartotojo valdymas
userRoutes.get("/", getAllUsers);
userRoutes.get("/logout", logoutC);
userRoutes.patch("/edit", updateUserC);
userRoutes.delete("/me", deleteMe);

// 3. Dashboard maršrutai
userRoutes.get("/my-budgets", allowAccessTo("User"), getUserBudgets);
userRoutes.get("/history", allowAccessTo("User"), userCombinedHistoryC);
userRoutes.get("/remaining-budget", allowAccessTo("User"), getRemainingBudgetC);

// 4. Pajamos (Income)
userRoutes.post("/:id/income/add", allowAccessTo("User"), restrictToOwnUser, incomeVal, validate, createIncomeC);
userRoutes.get("/:id/income/:incomeId", allowAccessTo("User"), restrictToOwnUser, getIncomeByIdC);
userRoutes.patch("/:id/income/:incomeId", allowAccessTo("User"), restrictToOwnUser, updateIncomeC);
userRoutes.delete("/:id/income/delete/:incomeId", allowAccessTo("User"), restrictToOwnUser, deleteIncome);

// 5. Išlaidos (Expenses)
userRoutes.post("/:id/expenses/add", allowAccessTo("User"), restrictToOwnUser, validate, createExpenseC);
userRoutes.get("/:id/expense/:expenseId", allowAccessTo("User"), restrictToOwnUser, getExpenseByIdC);
userRoutes.patch("/:id/expenses/edit/:expenseId", allowAccessTo("User"), restrictToOwnUser, expenseEdit, validate, updateExpense);
userRoutes.delete("/:id/expenses/delete/:expenseId", allowAccessTo("User"), restrictToOwnUser, deleteExpenseC);

// 6. Statistika
userRoutes.get("/:id/expenses/byCategory", allowAccessTo("User"), expensesByCategory, validate, expensesByCategoryD);
userRoutes.get("/:date/totalIncome", allowAccessTo("User"), totalMonthlyIncomeC);
userRoutes.get("/:date/totalExpenses", allowAccessTo("User"), totalMonthlyExpensesC);
userRoutes.get("/:date/totalBalance", allowAccessTo("User"), userMonthlyBalanceC);



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