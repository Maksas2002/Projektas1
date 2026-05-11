import axios from "axios";
import errorHandler from "../../utils/errorHandler";
import { ExpensesContext } from "../../utlis/ExpensesContext";
import { TransactionContext } from "../../utlis/TransactionContext";
import { useContext, useEffect, useState } from "react";
import { MonthContext } from "../../utlis/MonthContext";

function MonthlyExpenses() {
  const { month } = useContext(MonthContext);
  const { transaction } = useContext(TransactionContext);
  const { expenses, setExpenses } = useContext(ExpensesContext);
  const [error, setError] = useState(null);
  const selectedMonth =
    typeof month === "string" && month
      ? month
      : new Date().toISOString().slice(0, 7);

  const getMonth = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/user/${selectedMonth}-01/totalExpenses`,
        { withCredentials: true }
      );
      setExpenses(response.data.expensesSum[0].total_expenses);
    } catch (error) {
      setError(errorHandler(error));
    }
  };

  useEffect(() => {
    getMonth();
  }, [selectedMonth, transaction]);

  return (
    <section className="border border-[#1b346c] bg-[#111b3c] rounded-lg p-5 min-h-[132px]">
      <div className="flex items-start justify-between">
        <p className="text-slate-300 text-sm">Expenses</p>
        <span className="text-rose-400 text-xs">DOWN</span>
      </div>
      <p className="text-white text-2xl font-semibold mt-4">EUR {expenses}</p>
      <p className="text-sky-300 text-xs mt-3">This month</p>
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </section>
  );
}

export default MonthlyExpenses;
