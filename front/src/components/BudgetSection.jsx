import BudgetLimitUpdate from "./BudgetLimitUpdate";
import { useEffect, useMemo, useState, useContext } from "react";
import axios from "axios";
import { MonthContext } from "../utlis/MonthContext";
import { TransactionContext } from "../utlis/TransactionContext";
import RemainingBudgetSection from "./RemainingBudgetSection";
import errorHandler from "../utils/errorHandler";

const BudgetSection = () => {
  const { month } = useContext(MonthContext);
  const { transaction } = useContext(TransactionContext);
  const [budgets, setBudgets] = useState([]);
  const [exCat, setExCat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(true);
  const [showUpdates, setShowUpdates] = useState(false);
  const [limit, setLimit] = useState([]);
  const [error, setError] = useState(null);

  const selectedMonth =
    typeof month === "string" && month
      ? month
      : new Date().toISOString().slice(0, 7);

  const totalExpenses = useMemo(
    () => budgets.reduce((sum, item) => sum + Number(item.amount_used || 0), 0),
    [budgets],
  );

  //get expenses categories
  const getExCat = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/categories/expenses",
        {
          withCredentials: true,
        },
      );
      setExCat(res.data.catList);
    } catch (error) {
      setError(errorHandler(error));
    }
  };

  useEffect(() => {
    getExCat();
  }, []);

  // chnage view of the tables
  const changeView = (show, showUpdates, setShow, setShowUpdates) => {
    if (show) {
      setShow(false);
      setShowUpdates(true);
    } else if (showUpdates) {
      setShow(true);
      setShowUpdates(false);
    }
  };

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/user/my-budgets",
          {
            withCredentials: true,
            params: { month: selectedMonth },
          },
        );

        if (res.data.status === "success") {
          setBudgets(res.data.data);
        }
      } catch (err) {
        console.error("Klaida:", err.response?.data);
      } finally {
        setLoading(false);
      }
    };
    fetchBudgets();
  }, [selectedMonth, transaction, limit]);

  return (
    <section className="bg-[#1b2448] p-5 rounded-lg border border-[#1b346c]">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-white text-base font-medium">
            Budget Limits by Category
          </h2>
          <p className="text-slate-500 text-xs">
            Expenses this month: EUR {totalExpenses.toFixed(2)}
          </p>
        </div>
        <button
          onClick={() => changeView(show, showUpdates, setShow, setShowUpdates)}
          className="text-sky-300 text-xs hover:text-sky-200"
        >
          Manage Budgets
        </button>
      </div>

      {/*Loads budget limit update table*/}
      <div className="flex flex-col">
        {showUpdates
          ? exCat.map((b, index) => (
            <BudgetLimitUpdate
              key={b.id}
              budgets={b}
              budgetAmount={budgets[index]}
              limit={limit}
              setLimit={setLimit}
              setError={setError}
            />
          ))
          : null}
        {showUpdates ? (
          <p className="text-center text-red-600 font-bold">{error}</p>
        ) : null}
      </div>

      {loading ? (
        <div className="py-8 text-slate-500 text-center italic">Loading...</div>
      ) : budgets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {budgets.map((b) => {
            const used = Number(b.amount_used || 0);
            const limit = Number(b.amount_limit || 0);
            const percent = limit > 0 ? Math.min((used / limit) * 100, 100) : 0;
            const isOverLimit = used >= limit && limit > 0;

            return (
              <div key={b.category_id} className="bg-[#0b1430] rounded-md p-4">
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-white">{b.category_name}</span>
                  <span className={isOverLimit ? "text-rose-400" : "text-sky-300"}>
                    EUR {used.toFixed(0)} / EUR {limit.toFixed(0)}
                  </span>
                </div>
                <div className="h-2 bg-[#071027] rounded-full overflow-hidden mt-3">
                  <div
                    className={isOverLimit ? "h-full bg-rose-500" : "h-full bg-sky-400"}
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center">
                  <RemainingBudgetSection categoryId={b.category_id} />
                  <p className={isOverLimit ? "text-rose-400 text-[11px] mt-2" : "text-slate-500 text-[11px] mt-2"}>
                    {percent.toFixed(0)}% used
                  </p>
                  {isOverLimit && (
                    <span className="text-[10px] text-red-500 font-bold uppercase animate-pulse">
                      Limit exceeded!
                    </span>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-10 text-center text-slate-500 border border-dashed border-[#283046] rounded-md">
          No budget limits found for this user.
        </div>
      )}
    </section>
  );
};

export default BudgetSection;
