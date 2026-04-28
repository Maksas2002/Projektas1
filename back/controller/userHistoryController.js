import { userCombinedHistoryM } from "../modules/userHistoryModel.js";
import { getAllCategoriesM } from "../modules/categoryModule.js";
import AppError from "../utils/appError.js";

export const userCombinedHistoryC = async (req, res, next) => {
  try {
    // get categories
    const categories = await getAllCategoriesM();

    const { id } = req.user;

    // get history
    const userCombinedHistory = await userCombinedHistoryM(id, categories);

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
