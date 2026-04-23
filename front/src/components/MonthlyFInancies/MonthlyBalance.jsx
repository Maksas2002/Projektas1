import axios from "axios";
import errorHandler from "../../utils/errorHandler";
import { BalanceContext } from "../../utlis//BalanceContext";
import { ExpensesContext } from "../../utlis/ExpensesContext";
import { IncomeContext } from "../../utlis/IncomeContext";
import { TransactionContext } from "../../utlis/TransactionContext";
import { useContext, useEffect, useState } from "react";
import { MonthContext } from "../../utlis/MonthContext";

function MonthlyBalance() {
  const month = useContext(MonthContext);
  const { income } = useContext(IncomeContext);
  const { expenses } = useContext(ExpensesContext);
  const { transaction } = useContext(TransactionContext);
  const { balance, setBalance } = useContext(BalanceContext);
  const [error, setError] = useState(null);



  const getBalance = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/user/${month.month}-1/totalBalance`,
        {
          withCredentials: true,
        },
      );
      setBalance(response.data.userMonthlyBalance);
    } catch (error) {
      setError(errorHandler(error));
    }
  };

  useEffect(() => {
    getBalance();
  }, [month.month, transaction]);


  // shows balance ups and downs

 const balanceSituation = () => {
  switch (true) {
    case Number(balance) === 0:
      return "oklch(74.6% 0.16 232.661)";
    case Number(income) >= Number(expenses):
      return "green";
    case Number(income) < Number(expenses):
      return "red";
    default:
      return "";
  }
};
console.log(Number(income) >= Number(expenses));

  return (
    <>
      <section className="border border-[#061a75] bg-linear-to-br from-[#020b33] to-[#14215a] rounded-[20px] p-8 mt-5 w-45">
        <p className="text-sky-400 pb-2 text-[0.8rem]">Balance</p>
        <p className="text-white text-[1.5rem] pb-2">€{balance}</p>
        <p style={{ color: balanceSituation() }}>{balance}</p>
        <p className="text-red-500">{error}</p>
      </section>
    </>
  );
}

export default MonthlyBalance;
