import { sql } from "../dbConnection.js";

// add income from user
export const createIncomeM = async () => {
  const income = await sql`
  INSERT INTO income ${sql(data, "amount", "description", "date", "user_id")}
  RETURNING *
  `;

  return income[0];
};
