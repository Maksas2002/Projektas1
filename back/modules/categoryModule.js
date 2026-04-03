import { sql } from "../dbConnection.js";

//get all
export const getAllCategoriesM = async () => {
  const categoryLists = await sql`SELECT * FROM categories ORDER BY id ASC`;

  return categoryLists;
};

//add category
export const createCategoryM = async (name, type, user_id = null) => {
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


