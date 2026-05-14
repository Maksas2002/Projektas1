import {
  getAllCategoriesM,
  getAllExpensesCategoriesM,
} from "../modules/categoryModule.js"; // Įsitikink, kad kelias teisingas
import AppError from "../utils/appError.js";

export const getAllCategoriesC = async (req, res, next) => {
  try {
    const categories = await getAllCategoriesM();

    // Grąžiname duomenis tiesiogiai kaip masyvą,
    // nes tavo Front-end tikisi res.data.filter(...)
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

// get all expenses categories
export const getAllExpensesCategoriesC = async (req, res, next) => {
  try {
    const categories = await getAllExpensesCategoriesM();

    if (categories.length === 0) {
      throw new AppError("No expense categories found", 404);
    }
    res.status(200).json({
      status: "success",
      catList: categories,
    });
  } catch (error) {
    next(error);
  }
};
