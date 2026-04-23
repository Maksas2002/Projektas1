import axios from "axios";
import { useContext, useEffect, useState } from "react";
import errorHandler from "../../utils/errorHandler"
import { MonthContext } from "../../utlis/MonthContext";

function MonthlyExpenses() {
  const month = useContext(MonthContext);
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
      console.log(response);
    } catch (error) {
        setError(errorHandler(error));
    }
  };

  useEffect(() => {
    getMonth()
  }, [month.month])

  return (
    <>
      <section className="border border-red-500 bg-linear-to-br from-[#020b33] to-[#14215a] rounded-[20px] p-8 mt-5 w-45">
        <p>Expenses</p>
        <p>Money</p>
        <p>This month</p>
        <p className="text-red-500">{error}</p>
      </section>
    </>
  );
}

export default MonthlyExpenses;
