import BudgetLimitUpdate from "./BudgetLimitUpdate";
import { useContext, useEffect, useMemo, useState, useContext } from "react";
import { TransactionContext } from "../utlis/TransactionContext";
import axios from "axios";
import { MonthContext } from "../utlis/MonthContext";
import { TransactionContext } from "../utlis/TransactionContext";

const BudgetSection = () => {
  const { month } = useContext(MonthContext);
  const { transaction } = useContext(TransactionContext);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(true);
  const [showUpdates, setShowUpdates] = useState(false);
  const [limit, setLimit] = useState([]);

  const selectedMonth =
    typeof month === "string" && month
      ? month
      : new Date().toISOString().slice(0, 7);
  const totalExpenses = useMemo(
    () => budgets.reduce((sum, item) => sum + Number(item.amount_used || 0), 0),
    [budgets],
  );

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
  }, [selectedMonth, transaction]);

  if (loading) {
    return (
      <div className="bg-[#161d31] p-8 rounded-2xl border border-[#283046] mt-6 shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-white text-xl font-medium tracking-tight">
            Budget Limits by Category
          </h2>
          <button className="text-[#7367f0] text-sm flex items-center gap-2 hover:brightness-125 transition-all">
            <span className="material-icons-outlined text-lg"></span> Manage
            Budgets
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.length > 0 ? (
            budgets.map((b) => {
              const used = Number(b.amount_used || 0);
              const limit = Number(b.amount_limit || 0);
              const percent =
                limit > 0 ? Math.min((used / limit) * 100, 100) : 0;

              // NAUJA: Patikriname ar limitas viršytas
              const isOverLimit = used >= limit && limit > 0;

              return (
                <div
                  key={b.category_id}
                  className={`bg-[#101627] p-6 rounded-xl border transition-all ${isOverLimit ? "border-red-500/50" : "border-[#283046] hover:border-[#3b4461]"}`}
                >
                  <div className="flex justify-between items-center mb-4 text-sm font-medium">
                    <span className="text-slate-300">{b.category_name}</span>
                    {/* PAKEISTAS SPALVOS STILIUS TEKSTUI */}
                    <span
                      className={
                        isOverLimit ? "text-red-500" : "text-[#7367f0]"
                      }
                    >
                      €{used.toFixed(0)}{" "}
                      <span className="text-slate-500 font-normal">
                        / €{limit.toFixed(0)}
                      </span>
                    </span>
                  </div>
                  <div className="w-full bg-[#1e293b] h-1.5 rounded-full overflow-hidden mb-3">
                    <div
                      // PAKEISTA SPALVA PROGRESO JUOSTAI
                      className={`h-full rounded-full transition-all duration-1000 ${isOverLimit ? "bg-red-500" : "bg-[#7367f0]"}`}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest ${isOverLimit ? "text-red-500" : "text-slate-500"}`}
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
            <div className="col-span-full py-10 text-center text-slate-500 italic border border-dashed border-[#283046] rounded-xl">
              Nėra nustatytų biudžeto limitų šiam vartotojui.
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default BudgetSection;
