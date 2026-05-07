import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { MonthContext } from "../utlis/MonthContext";
import { TransactionContext } from "../utlis/TransactionContext";
import RemainingBudgetSection from "./RemainingBudgetSection";

const BudgetSection = () => {
  const { month } = useContext(MonthContext);
  const { transaction } = useContext(TransactionContext);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const selectedMonth =
    typeof month === "string" && month
      ? month
      : new Date().toISOString().slice(0, 7);
  const totalExpenses = useMemo(
    () => budgets.reduce((sum, item) => sum + Number(item.amount_used || 0), 0),
    [budgets]
  );

  useEffect(() => {
    const fetchBudgets = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/user/my-budgets",
          {
            withCredentials: true,
            params: { month: selectedMonth },
          }
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
  }, [selectedMonth, transaction]);

  if (loading) {
    return (
      <div className="p-10 text-slate-500 text-center italic">
        Kraunama...
      </div>
    );
  }

  return (
    <div className="bg-[#161d31] p-8 rounded-lg border border-[#283046] mt-6 shadow-xl">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            Selected month: {selectedMonth}
          </p>
          <h2 className="text-white text-xl font-medium tracking-tight">
            Budget Limits by Category
          </h2>
        </div>
        <div className="rounded-lg border border-[#283046] bg-[#101627] px-5 py-3 text-right">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            Monthly expenses
          </p>
          <p className="text-white text-2xl font-semibold">
            EUR {totalExpenses.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.length > 0 ? (
          budgets.map((b) => {
            const used = Number(b.amount_used || 0);
            const limit = Number(b.amount_limit || 0);
            const percent = limit > 0 ? Math.min((used / limit) * 100, 100) : 0;
            const isOverLimit = used >= limit && limit > 0;

            return (
              <div
                key={b.category_id}
                className={`bg-[#101627] p-6 rounded-lg border transition-all ${
                  isOverLimit
                    ? "border-red-500/50"
                    : "border-[#283046] hover:border-[#3b4461]"
                }`}
              >
                <div className="flex justify-between items-center gap-4 mb-4 text-sm font-medium">
                  <span className="text-slate-300">{b.category_name}</span>
                  <span
                    className={`text-right ${
                      isOverLimit ? "text-red-500" : "text-[#7367f0]"
                    }`}
                  >
                    EUR {used.toFixed(0)}
                    <span className="text-slate-500 font-normal">
                      {" "}
                      / EUR {limit.toFixed(0)}
                    </span>
                  </span>
                </div>
                <div className="w-full bg-[#1e293b] h-1.5 rounded-full overflow-hidden mb-3">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      isOverLimit ? "bg-red-500" : "bg-[#7367f0]"
                    }`}
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center">
                  <RemainingBudgetSection categoryId={b.category_id}/>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest ${
                      isOverLimit ? "text-red-500" : "text-slate-500"
                    }`}
                  >
                    {percent.toFixed(0)}% used
                  </span>
                  {isOverLimit && (
                    <span className="text-[10px] text-red-500 font-bold uppercase animate-pulse">
                      Limit exceeded!
                    </span>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-10 text-center text-slate-500 italic border border-dashed border-[#283046] rounded-lg">
            Nera nustatytu biudzeto limitu siam vartotojui.
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetSection;
