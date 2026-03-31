import { createIncomeM } from "../modules/incomeModule.js";
import AppError from "../utils/appError.js";

export const createIncomeC = async (req, res, next) => {
  try {
    const newData = req.body;
    const { id } = req.params;

    if (!newData.amount || !newData.date) {
      throw new AppError("Error, not enough info", 400);
    } else if (!newData) {
      throw new AppError("Error", 400);
    }

    const post = await createIncomeM(newData, {id});
    res.status(201).json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};
