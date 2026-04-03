import { createCategoryM, getAllCategoriesM, getCategoryByIdM, getCategoryByNameM, updateCategoryM } from "../modules/categoryModule.js";

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
        message: "Category created successfully",
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

export const updateCategory = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, type } = req.body;

      if (!name || !type) {
        return res.status(400).json({
          message: "Name and type are required",
        });
      }

      const existingCategory = await getCategoryByIdM(id);
      if (!existingCategory) {
        return res.status(404).json({
          message: "Category not found",
        });
      }

      const nameTaken = await getCategoryByNameM(name);
      if (nameTaken && nameTaken.id !== Number(id)) {
        return res.status(409).json({
          message: "Category name already exists",
        });
      }

      const updated = await updateCategoryM(id, name, type);

      res.status(200).json({
        message: "Categories fetched successfully",
        data: updated,
      })

    } catch (error) {
      next(error);
    }
};

export const deleteCategory = async (req, res, next) => {
    res.status(200).json({
      message: "Test",
    });
};
