import { sql } from "../dbConnection.js";

export const budgetQueries = {
    /**
     * 1. Gauna vartotojo biudžetus kartu su susumuotomis išlaidomis.
     */
    getUserBudgetsWithExpenses: async (userId) => {
        return await sql`
            SELECT 
                c.id AS category_id, 
                c.name AS category_name, 
                COALESCE(b.amount_limit, 500.00)::FLOAT AS amount_limit,
                COALESCE((
                    SELECT SUM(amount)::FLOAT 
                    FROM expenses 
                    WHERE category_id = c.id AND user_id = ${userId}
                ), 0) AS amount_used
            FROM categories c
            LEFT JOIN budgets b ON c.id = b.category_id AND b.user_id = ${userId}
            WHERE c.name IN ('Food', 'Transport', 'Entertainment', 'Shopping', 'Health', 'Travel')
            ORDER BY c.id ASC;
        `;
    },

    /**
     * 2. Sukuria standartinius limitus naujam vartotojui registracijos metu.
     */
    setDefaultBudgets: async (userId) => {
        const defaultBudgets = [
            { name: 'Food', limit: 500 },
            { name: 'Transport', limit: 200 },
            { name: 'Entertainment', limit: 150 },
            { name: 'Shopping', limit: 250 },
            { name: 'Health', limit: 300 },
            { name: 'Travel', limit: 500 }
        ];

        return await Promise.allSettled(defaultBudgets.map(item => 
            sql`
                INSERT INTO budgets (user_id, category_id, amount_limit)
                VALUES (
                    ${userId}, 
                    (SELECT id FROM categories WHERE name = ${item.name} LIMIT 1), 
                    ${item.limit}
                ) ON CONFLICT (user_id, category_id) DO NOTHING;
            `
        ));
    }
};