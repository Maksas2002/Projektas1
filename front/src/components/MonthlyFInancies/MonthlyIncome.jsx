import axios from "axios";
import errorHandler from "../../utils/errorHandler";
import { IncomeContext } from "../../utlis/IncomeContext";
import { TransactionContext } from "../../utlis/TransactionContext";
import { useContext, useEffect, useState } from "react";
import { MonthContext } from "../../utlis/MonthContext";

function MonthlyIncome() {
  const month = useContext(MonthContext);
  const { transaction } = useContext(TransactionContext);
  const { income, setIncome } = useContext(IncomeContext);
  const [error, setError] = useState(null);

  const getIncome = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/user/${month.month}-1/totalIncome`,
        {
          withCredentials: true,
        },
      );
      setIncome(response.data.incomeSum[0].total_income);
    } catch (error) {
      setError(errorHandler(error));
    }
  };

  useEffect(() => {
    getIncome();
  }, [month.month, transaction]);

  return (
    <>
      <section className="border border-green-500 bg-linear-to-br from-[#020b33] to-[#14215a] rounded-[20px] p-8 mt-5 w-45">
        <p className="text-sky-400 pb-2 text-[0.8rem]">Income</p>
        <p className="text-white text-[1.5rem] pb-2">€{income}</p>
        <p className="text-sky-400 text-[0.8rem]">This month</p>
        <p className="text-red-500">{error}</p>
      </section>
    </>
  );
}

export default MonthlyIncome;
