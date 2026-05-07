import { getMonthlyChartDataM } from "../modules/chartModule.js";

const getMonthRange = (month) => {
  const selectedMonth = /^\d{4}-\d{2}$/.test(month || "")
    ? month
    : new Date().toISOString().slice(0, 7);
  const [year, monthNumber] = selectedMonth.split("-").map(Number);
  const startDate = `${selectedMonth}-01`;
  const endDate = new Date(Date.UTC(year, monthNumber, 0))
    .toISOString()
    .slice(0, 10);

  return { selectedMonth, startDate, endDate };
};

export const getMonthlyChartDataC = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { selectedMonth, startDate, endDate } = getMonthRange(req.query.month);
    const data = await getMonthlyChartDataM(userId, startDate, endDate);

    const totals = data.reduce(
      (acc, item) => ({
        income: acc.income + Number(item.income || 0),
        expenses: acc.expenses + Number(item.expenses || 0),
        balance: acc.balance + Number(item.balance || 0),
      }),
      { income: 0, expenses: 0, balance: 0 }
    );

    res.status(200).json({
      status: "success",
      month: selectedMonth,
      totals,
      data,
    });
  } catch (error) {
    next(error);
  }
};
