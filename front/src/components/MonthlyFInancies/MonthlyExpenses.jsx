import axios from "axios";
import errorHandler from "../../utils/errorHandler";
import {ExpensesContext} from "../../utlis/ExpensesContext";
import { useContext, useEffect, useState } from "react";
import { MonthContext } from "../../utlis/MonthContext";

function MonthlyExpenses() {
  const month = useContext(MonthContext);
  const {  expenses, setExpenses } = useContext(ExpensesContext);
  const [error, setError] = useState(null);

  // get income

  const getMonth = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/user/${month.month}-1/totalExpenses`,
        {
          withCredentials: true,
        },
      );
      setExpenses(response.data.expensesSum[0].total_expenses);
      // setExpenses();
    } catch (error) {
      setError(errorHandler(error));
    }
  };

  useEffect(() => {
    getMonth();
  }, [month.month]);

  return (
    <>
      <section className="border border-red-500 bg-linear-to-br from-[#020b33] to-[#14215a] rounded-[20px] p-8 mt-5 w-45">
        <p className="text-sky-400 pb-2 text-[0.8rem]">Expenses</p>
        <p className="text-white text-[1.5rem] pb-2">€{expenses}</p>
        <p className="text-sky-400 text-[0.8rem]">This month</p>
        <p className="text-red-500">{error}</p>
      </section>
    </>
  );
}

export default MonthlyExpenses;
