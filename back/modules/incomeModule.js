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

// get income by id
export const getIncomeByIdM = async (userId, incomeId) => {
  const income = await sql`
    SELECT *
    FROM income
    WHERE id = ${incomeId} AND user_id = ${userId}
    LIMIT 1
  `;

  return income[0];
};

// update income
export const updateIncomeM = async (userId, incomeId, newData) => {
  const updated = await sql`
    UPDATE income
    SET 
      amount = ${newData.amount},
      description = ${newData.description},
      date = ${newData.date},
      category_id = ${newData.category_id}
    WHERE id = ${incomeId} AND user_id = ${userId}
    RETURNING *
  `;

  return updated[0];
};


// delete income from user
export const deleteIncomeM = async (incomeId, id) =>{
  const deleteIncome = await sql`
    delete from income
    where id = ${incomeId} and user_id = ${id}
    returning *
  `;

  return deleteIncome[0];
}