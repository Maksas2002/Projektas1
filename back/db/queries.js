import { sql } from "../dbConnection.js";

export const budgetQueries = {
    // 1. Gauname biudžetus ir SUJUNGIAME su išlaidomis pagal teisingą datą
    getUserBudgetsWithExpenses: async (userId, year, month) => {
        const targetYear = parseInt(year) || new Date().getFullYear();
        const targetMonth = parseInt(month) || (new Date().getMonth() + 1);
        
        // Formuojame YYYY-MM formatą (pvz., '2026-05')
        const dateFilter = `${targetYear}-${String(targetMonth).padStart(2, '0')}`;

        return await sql`
            SELECT 
                b.id, 
                c.name AS category_name, 
                b.amount_limit, 
                COALESCE(
                    (SELECT SUM(e.amount) 
                     FROM expenses e 
                     WHERE e.category_id = b.category_id 
                     AND e.user_id = ${userId}
                     AND TO_CHAR(e.date, 'YYYY-MM') = ${dateFilter}
                    ), 0
                ) AS total_spent
            FROM budgets b
            JOIN categories c ON b.category_id = c.id
            WHERE b.user_id = ${userId}
        `;
    },

    // 2. Sukuriame numatytuosius limitus (€500) tik išlaidų kategorijoms
    setDefaultBudgets: async (userId) => {
        // Pasiimame visas kategorijas, kurios NĖRA pajamos
        const categories = await sql`
            SELECT id FROM categories 
            WHERE name NOT IN ('Salary', 'Freelance', 'Income', 'Pajamos')
        `;

        for (const cat of categories) {
            await sql`
                INSERT INTO budgets (user_id, category_id, amount_limit)
                VALUES (${userId}, ${cat.id}, 500)
                ON CONFLICT (user_id, category_id) 
                DO UPDATE SET amount_limit = 500; -- Jei jau buvo €1, pakeis į €500
            `;
        }
    }
};

export default budgetQueries;