import { userExpenseM, userIncomeM } from "../modules/userHistoryModel.js";
import AppError from "../utils/appError.js";

export const userHistoryC = async (req, res, next) => {
  try {
    const { id } = req.user;

    const userIncome = await userIncomeM(id);
  const userExpenses = await userExpenseM(id);

    if (userIncome.length == 0 ) {
      throw new AppError("No patients found", 404);
    }

    res.status(200).json({
      status: "success",
      data: userIncome,
    });
  } catch (error) {
    next(error);
  }
};
