import { useEffect, useState } from "react";
import axios from "axios";
import ExpensesByCategory from "./ExpensesByCategory";
import errorHandler from "../../utils/errorHandler";

function ExpensesTotal() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [month, setMonth] = useState("2026-04");

  const [showPeriodFilter, setShowPeriodFilter] = useState(false);
  const [startDate, setStartDate] = useState("2026-04-01");
  const [endDate, setEndDate] = useState("2026-04-30");
  const [periodTotal, setPeriodTotal] = useState(null);
  const [periodError, setPeriodError] = useState(null);

  const getDateRange = (monthString) => {
    const [year, month] = monthString.split("-");
    const startDate = `${year}-${month}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    const endDate = `${year}-${month}-${String(lastDay).padStart(2, "0")}`;
    return { startDate, endDate };
  };

  const fetchCategoryTotal = async () => {
    try {
      setLoading(true);
      setError(null);

      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.data?.id;

      const { startDate, endDate } = getDateRange(month);

      const res = await axios.get(
        `http://localhost:3000/api/v1/user/${userId}/expenses/byCategory?startDate=${startDate}&endDate=${endDate}`,
        {
          withCredentials: true,
        }
      );

      setData(res.data.data);
    } catch (error) {
      setError(errorHandler(error));
    } finally {
      setLoading(false);
    }
  };

  const fetchPeriodTotal = async () => {
    try {
      setPeriodError(null);
      setPeriodTotal(null);

      const res = await axios.get(
        `http://localhost:3000/api/v1/user/expenses/total-by-period?startDate=${startDate}&endDate=${endDate}`,
        {
          withCredentials: true,
        }
      );

      setPeriodTotal(res.data.data.totalExpenses);
    } catch (error) {
      setPeriodError(errorHandler(error));
    }
  };

  const clearPeriodFilter = () => {
    setPeriodTotal(null);
    setPeriodError(null);
    setShowPeriodFilter(false);
  };

  useEffect(() => {
    fetchCategoryTotal();
  }, [month]);

  return (
    <section className="flex flex-col items-center justify-center pt-3 pb-3 gap-2 rounded-[13px] border-[#061a75] bg-[#020b33] border w-full max-w-185 mx-auto">
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="flex w-full justify-between items-center gap-3 flex-wrap px-10">
        <p className="text-white text-[1.2rem]">
          Expenses Total
        </p>

        <div className="flex items-center gap-3">
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="bg-[#1f2747] text-white p-2 rounded"
          />

          <button
            type="button"
            onClick={() => setShowPeriodFilter(!showPeriodFilter)}
            className="bg-[#1f2747] text-white p-2 rounded hover:bg-[#2d365f]"
          >
            Filter by period
          </button>
        </div>
      </div>

      {showPeriodFilter && (
        <div className="flex flex-wrap justify-center items-end gap-3 mt-3 text-white">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Start date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-[#1f2747] text-white p-2 rounded"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">End date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-[#1f2747] text-white p-2 rounded"
            />
          </div>

          <button
            type="button"
            onClick={fetchPeriodTotal}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Apply
          </button>

          <button
            type="button"
            onClick={clearPeriodFilter}
            className="bg-[#1f2747] text-white p-2 rounded hover:bg-[#2d365f]"
          >
            Clear
          </button>
        </div>
      )}

      {periodTotal !== null && (
        <p className="text-white mt-2">
          Period total expenses:{" "}
          <span className="font-bold">
            {Number(periodTotal).toFixed(2)} €
          </span>
        </p>
      )}

      {periodError && (
        <p className="text-red-500 text-center">{periodError}</p>
      )}

      <ExpensesByCategory data={data} loading={loading} />
    </section>
  );
}

export default ExpensesTotal;