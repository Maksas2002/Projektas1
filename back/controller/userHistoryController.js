import { userCombinedHistoryM } from "../modules/userHistoryModel.js";
import AppError from "../utils/appError.js";

export const userCombinedHistoryC = async (req, res, next) => {
  try {
    const { id } = req.user;

    const userCombinedHistory = (await userCombinedHistoryM(id));

    if (userCombinedHistory.length == 0) {
      throw new AppError("No incomes or expenses found", 404);
    }

    res.status(200).json({
      status: "success",
      data: userCombinedHistory,
    });
  } catch (error) {
    next(error);
  }
};
