import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ExpensesByCategory from "./ExpensesByCategory";
import errorHandler from "../../utils/errorHandler";
import ExportExpensesBtn from "../ExportExpensesBtn";
import { MonthContext } from "../../utlis/MonthContext";
import { TransactionContext } from "../../utlis/TransactionContext";

function ExpensesTotal() {
  const { month, setMonth } = useContext(MonthContext);
  const { transaction } = useContext(TransactionContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const selectedMonth = month || new Date().toISOString().slice(0, 7);

  const getDateRange = (monthString) => {
    const [year, month] = monthString.split("-");
    const startDate = `${year}-${month}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    const endDate = `${year}-${month}-${String(lastDay).padStart(2, "0")}`;
    return { startDate, endDate };
  };

  const fetchCategoryTotal = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.data?.id;

      const { startDate, endDate } = getDateRange(selectedMonth);

      const res = await axios.get(
        `http://localhost:3000/api/v1/user/${userId}/expenses/byCategory?startDate=${startDate}&endDate=${endDate}`,
        {
          withCredentials: true,
        },
      );
      setData(res.data.data);
    } catch (error) {
      setError(errorHandler(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryTotal();
  }, [selectedMonth, transaction]);

  return (
    <section className="flex flex-col items-center justify-center pt-3 pb-3 gap-2 rounded-[13px] border-[#061a75] bg-[#020b33] border w-full max-w-185 mx-auto">
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="flex w-full justify-around items-center">
        <p className="text-white self-baseline text-[1.2rem]">Expenses Total</p>
        <div>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setMonth(e.target.value)}
            className="bg-[#1f2747] max-w-30 text-white p-2 mr-2 rounded"
          />
        </div>
      </div>

      <ExpensesByCategory data={data} loading={loading} />

      <div className="flex w-full justify-around items-center border-t-2 border-t-[#061a75] pt-4">
        <ExportExpensesBtn startDate={startDate} endDate={endDate} />
        <div className="flex flex-row">
          <div>
            <label className="text-white text-sm block">Start</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-[#1f2747] max-w-30 text-white p-2 mr-2 rounded"
            />
          </div>
          <div>
            <label className="text-white text-sm block">End</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-[#1f2747] max-w-30 text-white p-2 mr-2 rounded"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export default ExpensesTotal;
