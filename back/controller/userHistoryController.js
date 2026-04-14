import { userExpenseM, userIncomeM } from "../modules/userHistoryModel.js";
import AppError from "../utils/appError.js";

export const userHistoryC = async (req, res, next) => {
  try {
    const { id } = req.user;

    const userIncome = await userIncomeM(id);
    const userExpenses = await userExpenseM(id);

    const combinedHistory = {
      ...userIncome,
      totaIncome: userIncome.length,
      totalExpenses: userExpenses.length,
      expensesData: userExpenses,
    };
console.log(combinedHistory);
    if (userIncome.length == 0 && userExpenses.length == 0) {
      throw new AppError("No incomes or expenses found", 404);
    }

    res.status(200).json({
      status: "success",
      incomeData: combinedHistory,
    });
  } catch (error) {
    next(error);
  }
};
