import { getAllCategoriesM } from "../modules/categoryModule.js";

export const createCategory = async (req, res) => {
    res.status(200).json({
      message: "Test",
    });
};
export const getCategories = async (req, res, next) => {
    try {
      const categories = await getAllCategoriesM();

      res.status(200).json({
        message: "Categories fetched successfully",
        data: categories,
      })

    } catch (error) {
      next(error);
    }
};
export const updateCategory = async (req, res) => {
    res.status(200).json({
      message: "Test",
    });
};
export const deleteCategory = async (req, res) => {
    res.status(200).json({
      message: "Test",
    });
};
