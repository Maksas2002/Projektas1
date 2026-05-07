import { sql } from "../dbConnection.js";

export const getMonthlyChartDataM = async (userId, startDate, endDate) => {
  return await sql`
    WITH days AS (
      SELECT generate_series(${startDate}::date, ${endDate}::date, interval '1 day')::date AS date
    ),
    income_totals AS (
      SELECT date, SUM(amount)::float AS income
      FROM income
      WHERE user_id = ${userId}
        AND date >= ${startDate}
        AND date <= ${endDate}
      GROUP BY date
    ),
    expense_totals AS (
      SELECT date, SUM(amount)::float AS expenses
      FROM expenses
      WHERE user_id = ${userId}
        AND date >= ${startDate}
        AND date <= ${endDate}
      GROUP BY date
    )
    SELECT
      TO_CHAR(days.date, 'YYYY-MM-DD') AS date,
      COALESCE(income_totals.income, 0)::float AS income,
      COALESCE(expense_totals.expenses, 0)::float AS expenses,
      (COALESCE(income_totals.income, 0) - COALESCE(expense_totals.expenses, 0))::float AS balance
    FROM days
    LEFT JOIN income_totals ON income_totals.date = days.date
    LEFT JOIN expense_totals ON expense_totals.date = days.date
    ORDER BY days.date ASC;
  `;
};
