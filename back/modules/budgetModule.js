import { sql } from "../dbConnection.js";

export const getBudgetsFromDB = async (userId) => {
  return await sql`
    SELECT 
      b.category_id,
      c.name as category_name,
      b.amount_limit,
      COALESCE(
        (SELECT SUM(amount) 
         FROM expenses 
         WHERE user_id = b.user_id 
         AND category_id = b.category_id
         AND date_trunc('month', date) = date_trunc('month', CURRENT_DATE)
        ), 0
      ) as amount_used
    FROM budgets b
    JOIN categories c ON b.category_id = c.id
    WHERE b.user_id = ${userId};
  `;
};

// Pridedame ir istorijos funkciją tam pačiam moduliui
export const getHistoryFromDB = async (userId) => {
  return await sql`
    (SELECT id, amount, description, date, 'income' as type, NULL as category_name
     FROM income WHERE user_id = ${userId})
    UNION ALL
    (SELECT e.id, e.amount, e.description, e.date, 'expense' as type, c.name as category_name
     FROM expenses e
     LEFT JOIN categories c ON e.category_id = c.id
     WHERE e.user_id = ${userId})
    ORDER BY date DESC LIMIT 20;
  `;
};

export const getRemainingBudgetM = async (userId, MDate) => {
  const remainingBudget = sql`
    select
      categories.id as category_id,
      categories.name as category_name,
      budgets.amount_limit as budget_limit,
      coalesce(sum(expenses.amount), 0) as total_spent,
      (budgets.amount_limit - coalesce(sum(expenses.amount), 0)) as remaining
    from budgets
    join categories
      on categories.id = budgets.category_id
    left join expenses
      on expenses.category_id = categories.id
      and expenses.user_id = budgets.user_id
      and date_trunc('month', expenses.date) = date_trunc('month', ${MDate}::date)
    where budgets.user_id = ${userId}
    group by categories.id, categories.name, budgets.amount_limit
    order by categories.name;
  `;

  return remainingBudget;
};

// update user's monthly budget limits

export const updateBudgetLimitsM = async (
  newBudgetLimitN,
  id,
  categoryId,
  fDateShort,
) => {
  const newBudgetLimit = await sql`
   INSERT INTO  budgets (user_id, category_id, amount_limit, budget_date)
   VALUES (${parseInt(id)}, ${parseInt(categoryId)}, ${parseInt(newBudgetLimitN)}, ${fDateShort})
   ON CONFLICT (user_id, category_id, budget_date)
   DO UPDATE 
   SET amount_limit = EXCLUDED.amount_limit,
   budget_date = ${fDateShort}
   WHERE budgets.user_id = ${parseInt(id)}
   AND budgets.category_id = ${parseInt(categoryId)}
   RETURNING *;
  `;

  return newBudgetLimit[0];
};
