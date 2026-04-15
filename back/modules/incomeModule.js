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

// delete income from user
export const deleteIncomeM = async (incomeId, userId) =>{
  const deleteIncome = await sql`
    delete from income
    where id = ${incomeId} and user_id = ${userId}
    returning *
  `;

  return deleteIncome[0];
}