import { budgetQueries } from "../db/queries.js";

export const getUserBudgets = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?.data?.id;
        const selectedMonth = req.query.month;

        if (!userId) {
            return res.status(401).json({ 
                status: 'fail', 
                message: "Vartotojas nerastas" 
            });
        }

        // Kviečiame SQL užklausą iš atskiro failo
        const monthPattern = /^\d{4}-\d{2}$/;
        const month = monthPattern.test(selectedMonth || "")
            ? selectedMonth
            : new Date().toISOString().slice(0, 7);
        const [year, monthNumber] = month.split("-").map(Number);
        const startDate = `${month}-01`;
        const nextMonthDate = new Date(Date.UTC(year, monthNumber, 1))
            .toISOString()
            .slice(0, 10);

        const budgets = await budgetQueries.getUserBudgetsWithExpenses(
            userId,
            startDate,
            nextMonthDate
        );
        
        res.status(200).json({ 
            status: 'success',
            month,
            data: budgets 
        });
    } catch (error) {
        console.error("Biudžeto krovimo klaida:", error);
        res.status(500).json({ 
            status: 'error', 
            message: "Serverio klaida" 
        });
    }
};
