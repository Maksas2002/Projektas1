import { sql } from "../dbConnection.js";

// add income from user
export const createIncomeM = async (newData, {id}) => {
const data = {
  amount: newData.amount,
  description: newData.description,
  date: newData.date,
  category_id: newData.category_id,
  user_id: id,
}

  const income = await sql`
  INSERT INTO income ${sql(data, "amount", "description", "date", "category_id", "user_id")}
  RETURNING *
  `;

  return income[0];
};
