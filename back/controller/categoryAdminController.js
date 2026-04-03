import { createCategoryM, getAllCategoriesM, getCategoryByNameM } from "../modules/categoryModule.js";

export const createCategory = async (req, res, next) => {
    try {
      const {name, type, user_id} = req.body;

      if (!name || !type) {
        return res.status(400).json({
          message: "Name and type are required",
        });
      }

      //patikrina ar existuoja vardas
      const existing = await getCategoryByNameM(name);
      if (existing) {
        return res.status(409).json({
          message: "Category name already exists",
        });
      }

      //sukurema kategorija
      const category = await createCategoryM(name, type, user_id || null);

      res.status(200).json({
        message: "category created successfully",
        data: category
      });
    } catch (error) {
      next(error)
    }
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
