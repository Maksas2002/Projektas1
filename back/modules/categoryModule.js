import { sql } from "../dbConnection.js";

//get all
export const getAllCategoriesM = async () => {
  const categoryLists = await sql`
    SELECT 
      category.id,
      category.name,
      category.type,
      category.created_at,
      usr.name AS created_by
    FROM categories AS category
    LEFT JOIN users AS usr ON category.user_id = usr.id
    ORDER BY category.id ASC
  `;

  return categoryLists;
};

// get all expenses categories

export const getAllExpensesCategoriesM = async () => {
  const expenseCategoriesList = await sql`
  SELECT * FROM categories
  WHERE type = 'expense';
  `
  return expenseCategoriesList;
}

//add category
export const createCategoryM = async (name, type, user_id) => {
  const result = await sql`
    INSERT INTO categories (name, type, user_id)
    VALUES (${name}, ${type}, ${user_id})
    RETURNING *;
  `;
  return result[0];
};

//get all by names
export const getCategoryByNameM = async (name) => {
  const result = await sql`
    SELECT * FROM categories WHERE name = ${name};
  `;
  return result[0];
};

//checks for id
export const getCategoryByIdM = async (id) => {
  const result = await sql`
    SELECT * FROM categories WHERE id = ${id};
  `;
  return result[0];
};

//update category
export const updateCategoryM = async (id, name, type) => {
  const result = await sql`
    UPDATE categories
    SET name = ${name}, type = ${type}
    WHERE id = ${id}
    RETURNING *;
  `;
  return result[0];
};

export const deleteCategoryM = async (id) => {
  const result = await sql`
    DELETE FROM categories
    WHERE id = ${id}
    RETURNING *;
  `;
  return result[0];
};
