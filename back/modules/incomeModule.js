import { sql } from "../dbConnection.js";

// add income from user
export const createIncomeM = async (newData, {id}) => {
const data = {
  amount: newData.amount,
  description: newData.description,
  date: newData.date,
  user_id: id,
}

  const income = await sql`
  INSERT INTO income ${sql(data, "amount", "description", "date", "user_id")}
  RETURNING *
  `;

  return income[0];
};
