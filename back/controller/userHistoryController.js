import { userCombinedHistoryM } from "../modules/userHistoryModel.js";
import AppError from "../utils/appError.js";

export const userCombinedHistoryC = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { type, startDate, endDate } = req.query;

    // get selected categories from query ?category=categoryId
    const categoryIds = req.query.category
      ? parseInt(req.query.category)
      : null;

    if (type && !["income", "expense"].includes(type)) {
      throw new AppError("Transaction type must be income or expense", 400);
    }

    if ((startDate && !endDate) || (!startDate && endDate)) {
      throw new AppError("Start date and end date are required", 400);
    }

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      throw new AppError("Start date cannot be later than end date", 400);
    }

    // get history
    const userCombinedHistory = await userCombinedHistoryM(id, categoryIds, {
      type,
      startDate,
      endDate,
    });
    const total = userCombinedHistory.reduce(
      (sum, transaction) => sum + Number(transaction.amount || 0),
      0
    );

    if (userCombinedHistory.length == 0) {
      res.status(200).json({
        status: "success",
        data: [],
        total,
      });
      return;
    }

    res.status(200).json({
      status: "success",
      data: userCombinedHistory,
      total,
    });
  } catch (error) {
    next(error);
  }
};
