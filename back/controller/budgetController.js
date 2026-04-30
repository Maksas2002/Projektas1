import { budgetQueries } from "../db/queries.js";

export const getUserBudgets = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?.data?.id;

        if (!userId) {
            return res.status(401).json({ 
                status: 'fail', 
                message: "Vartotojas nerastas" 
            });
        }

        // Kviečiame SQL užklausą iš atskiro failo
        const budgets = await budgetQueries.getUserBudgetsWithExpenses(userId);
        
        res.status(200).json({ 
            status: 'success', 
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