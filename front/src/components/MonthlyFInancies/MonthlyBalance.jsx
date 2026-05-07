import axios from "axios";
import errorHandler from "../../utils/errorHandler";
import { BalanceContext } from "../../utlis//BalanceContext";
import { ExpensesContext } from "../../utlis/ExpensesContext";
import { IncomeContext } from "../../utlis/IncomeContext";
import { TransactionContext } from "../../utlis/TransactionContext";
import { useContext, useEffect, useState } from "react";
import { MonthContext } from "../../utlis/MonthContext";

function MonthlyBalance() {
  const { month } = useContext(MonthContext);
  const { income } = useContext(IncomeContext);
  const { expenses } = useContext(ExpensesContext);
  const { transaction } = useContext(TransactionContext);
  const { balance, setBalance } = useContext(BalanceContext);
  const [error, setError] = useState(null);
  const selectedMonth =
    typeof month === "string" && month
      ? month
      : new Date().toISOString().slice(0, 7);

  const getBalance = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/user/${selectedMonth}-01/totalBalance`,
        { withCredentials: true }
      );
      setBalance(response.data.userMonthlyBalance);
    } catch (error) {
      setError(errorHandler(error));
    }
  };

  useEffect(() => {
    getBalance();
  }, [selectedMonth, transaction]);

  const isPositive = Number(income) >= Number(expenses);

  return (
    <section className="border border-[#1b346c] bg-[#111b3c] rounded-lg p-5 min-h-[132px]">
      <div className="flex items-start justify-between">
        <p className="text-slate-300 text-sm">Balance</p>
        <span className="text-sky-300 text-xs">BAL</span>
      </div>
      <p className="text-white text-2xl font-semibold mt-4">EUR {balance}</p>
      <p className={isPositive ? "text-emerald-400 text-xs mt-3" : "text-rose-400 text-xs mt-3"}>
        {isPositive ? "+" : "-"} selected month
      </p>
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </section>
  );
}

export default MonthlyBalance;
