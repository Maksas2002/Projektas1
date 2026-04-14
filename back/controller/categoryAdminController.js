import { 
  createCategoryM, 
  deleteCategoryM, 
  getAllCategoriesM, 
  getCategoryByIdM, 
  getCategoryByNameM, 
  updateCategoryM 
} from "../modules/categoryModule.js";
import { createLogM } from "../modules/logModule.js";

export const createCategory = async (req, res, next) => {
    try {
      const {name, type} = req.body;
      const user_id = req.user.id;
      const username = req.user.name; // Gauname iš authProtect middleware

      const existing = await getCategoryByNameM(name);
      if (existing) {
        return res.status(409).json({ message: "Category name already exists" });
      }

      const category = await createCategoryM(name, type, user_id);

      // REGISTRUOJAME LOGĄ
      await createLogM(user_id, username, 'CREATE_CATEGORY', name, `Sukurta nauja ${type} kategorija`);

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
      const user_id = req.user.id;
      const username = req.user.name;

      const existingCategory = await getCategoryByIdM(id);
      if (!existingCategory) {
        return res.status(404).json({ message: "Category not found" });
      }

      const nameTaken = await getCategoryByNameM(name);
      if (nameTaken && nameTaken.id !== Number(id)) {
        return res.status(409).json({ message: "Category name already exists" });
      }

      const updated = await updateCategoryM(id, name, type);

      // REGISTRUOJAME LOGĄ
      await createLogM(
        user_id, 
        username, 
        'UPDATE_CATEGORY', 
        name, 
        `Pakeista iš [${existingCategory.name}, ${existingCategory.type}] į [${name}, ${type}]`
      );

      res.status(200).json({
        message: "Category updated successfully",
        data: updated,
      })
    } catch (error) {
      next(error);
    }
};

export const deleteCategory = async (req, res, next) => {
    try {
      const {id} = req.params;
      const user_id = req.user.id;
      const username = req.user.name;

      const existingCategory = await getCategoryByIdM(id);
      if (!existingCategory) {
        return res.status(404).json({ message: "Category not found" });
      }

      await deleteCategoryM(id);

      // REGISTRUOJAME LOGĄ
      await createLogM(user_id, username, 'DELETE_CATEGORY', existingCategory.name, `Ištrinta kategorija (ID: ${id})`);

      res.status(200).json({
        message: "Category deleted successfully",
      });
    } catch (error) {
      next(error)
    }
};