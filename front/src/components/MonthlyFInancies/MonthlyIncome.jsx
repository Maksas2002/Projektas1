import axios from "axios";
import errorHandler from "../../utils/errorHandler";
import { IncomeContext } from "../../utlis/IncomeContext";
import { TransactionContext } from "../../utlis/TransactionContext";
import { useContext, useEffect, useState } from "react";
import { MonthContext } from "../../utlis/MonthContext";

function MonthlyIncome() {
  const { month } = useContext(MonthContext);
  const { transaction } = useContext(TransactionContext);
  const { income, setIncome } = useContext(IncomeContext);
  const [error, setError] = useState(null);
  const selectedMonth =
    typeof month === "string" && month
      ? month
      : new Date().toISOString().slice(0, 7);

  const getIncome = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/user/${selectedMonth}-01/totalIncome`,
        { withCredentials: true }
      );
      setIncome(response.data.incomeSum[0].total_income);
    } catch (error) {
      setError(errorHandler(error));
    }
  };

  useEffect(() => {
    getIncome();
  }, [selectedMonth, transaction]);

  return (
    <section className="border border-[#1b346c] bg-[#111b3c] rounded-lg p-5 min-h-[132px]">
      <div className="flex items-start justify-between">
        <p className="text-slate-300 text-sm">Income</p>
        <span className="text-emerald-400 text-xs">UP</span>
      </div>
      <p className="text-white text-2xl font-semibold mt-4">EUR {income}</p>
      <p className="text-sky-300 text-xs mt-3">This month</p>
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </section>
  );
}

export default MonthlyIncome;
