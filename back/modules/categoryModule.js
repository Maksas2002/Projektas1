import { sql } from "../dbConnection.js";

//get all
export const getAllCategoriesM = async () => {
  const categoryLists = await sql`SELECT * FROM categories ORDER BY id ASC`;

  return categoryLists;
};



