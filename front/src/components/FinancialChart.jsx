import { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { MonthContext } from "../utlis/MonthContext";
import { TransactionContext } from "../utlis/TransactionContext";
import errorHandler from "../utils/errorHandler";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

const chartWidth = 720;
const chartHeight = 300;
const padding = { top: 24, right: 22, bottom: 42, left: 54 };
const plotWidth = chartWidth - padding.left - padding.right;
const plotHeight = chartHeight - padding.top - padding.bottom;

function FinancialChart() {
  const { month } = useContext(MonthContext);
  const { transaction } = useContext(TransactionContext);
  const [chartData, setChartData] = useState([]);
  const [totals, setTotals] = useState({ income: 0, expenses: 0, balance: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const selectedMonth =
    typeof month === "string" && month
      ? month
      : new Date().toISOString().slice(0, 7);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/charts/monthly",
          {
            withCredentials: true,
            params: { month: selectedMonth },
          }
        );

        setChartData(response.data.data || []);
        setTotals(response.data.totals || { income: 0, expenses: 0, balance: 0 });
      } catch (err) {
        setError(errorHandler(err));
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [selectedMonth, transaction]);

  const chart = useMemo(() => {
    const values = chartData.flatMap((item) => [
      Number(item.income || 0),
      Number(item.expenses || 0),
      Number(item.balance || 0),
    ]);
    const maxValue = Math.max(1, ...values);
    const minValue = Math.min(0, ...values);
    const range = maxValue - minValue || 1;
    const y = (value) => padding.top + ((maxValue - value) / range) * plotHeight;
    const zeroY = y(0);
    const step = plotWidth / Math.max(chartData.length, 1);
    const barWidth = Math.max(4, Math.min(8, step * 0.28));
    const balancePoints = chartData
      .map((item, index) => {
        const x = padding.left + index * step + step / 2;
        return `${x},${y(Number(item.balance || 0))}`;
      })
      .join(" ");

    return { maxValue, minValue, y, zeroY, step, barWidth, balancePoints };
  }, [chartData]);

  const hasData = chartData.some(
    (item) => Number(item.income || 0) > 0 || Number(item.expenses || 0) > 0
  );
  const axisValues = [
    chart.maxValue,
    chart.maxValue * 0.66,
    chart.maxValue * 0.33,
    0,
  ];

  return (
    <section className="bg-[#161d31] border border-[#283046] rounded-lg p-6 shadow-xl">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between mb-6">
        <div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            Selected month: {selectedMonth}
          </p>
          <h2 className="text-white text-xl font-medium tracking-tight">
            Financial Trends
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
          <div className="bg-[#101627] border border-[#283046] rounded-lg px-4 py-3">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
              Income
            </p>
            <p className="text-emerald-300 text-lg font-semibold">
              {money.format(totals.income)}
            </p>
          </div>
          <div className="bg-[#101627] border border-[#283046] rounded-lg px-4 py-3">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
              Expenses
            </p>
            <p className="text-red-300 text-lg font-semibold">
              {money.format(totals.expenses)}
            </p>
          </div>
          <div className="bg-[#101627] border border-[#283046] rounded-lg px-4 py-3">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
              Balance
            </p>
            <p
              className={`text-lg font-semibold ${
                totals.balance >= 0 ? "text-sky-300" : "text-red-300"
              }`}
            >
              {money.format(totals.balance)}
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="h-72 flex items-center justify-center text-slate-500 italic">
          Loading chart...
        </div>
      ) : error ? (
        <div className="h-72 flex items-center justify-center text-red-300">
          {error}
        </div>
      ) : !hasData ? (
        <div className="h-72 flex items-center justify-center text-slate-500 border border-dashed border-[#283046] rounded-lg">
          No income or expenses found for this month.
        </div>
      ) : (
        <>
          <div className="w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="min-w-[720px] w-full h-auto"
              role="img"
              aria-label="Monthly income, expenses, and balance chart"
            >
              {axisValues.map((value) => {
                const y = chart.y(value);
                return (
                  <g key={value}>
                    <line
                      x1={padding.left}
                      x2={chartWidth - padding.right}
                      y1={y}
                      y2={y}
                      stroke="#283046"
                      strokeWidth="1"
                    />
                    <text
                      x={padding.left - 10}
                      y={y + 4}
                      textAnchor="end"
                      className="fill-slate-500 text-[11px]"
                    >
                      {money.format(value).replace(".00", "")}
                    </text>
                  </g>
                );
              })}

              {chart.minValue < 0 && (
                <line
                  x1={padding.left}
                  x2={chartWidth - padding.right}
                  y1={chart.zeroY}
                  y2={chart.zeroY}
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                />
              )}

              {chartData.map((item, index) => {
                const x = padding.left + index * chart.step + chart.step / 2;
                const income = Number(item.income || 0);
                const expenses = Number(item.expenses || 0);
                const incomeY = chart.y(income);
                const expenseY = chart.y(expenses);
                const day = item.date.slice(8, 10);

                return (
                  <g key={item.date}>
                    <rect
                      x={x - chart.barWidth - 1}
                      y={incomeY}
                      width={chart.barWidth}
                      height={Math.max(chart.zeroY - incomeY, 0)}
                      rx="2"
                      fill="#34d399"
                    >
                      <title>{`${item.date} income: ${money.format(income)}`}</title>
                    </rect>
                    <rect
                      x={x + 1}
                      y={expenseY}
                      width={chart.barWidth}
                      height={Math.max(chart.zeroY - expenseY, 0)}
                      rx="2"
                      fill="#fb7185"
                    >
                      <title>{`${item.date} expenses: ${money.format(expenses)}`}</title>
                    </rect>
                    {(index === 0 ||
                      index === chartData.length - 1 ||
                      Number(day) % 5 === 0) && (
                      <text
                        x={x}
                        y={chartHeight - 16}
                        textAnchor="middle"
                        className="fill-slate-500 text-[10px]"
                      >
                        {day}
                      </text>
                    )}
                  </g>
                );
              })}

              <polyline
                points={chart.balancePoints}
                fill="none"
                stroke="#60a5fa"
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="flex flex-wrap gap-4 pt-4 text-xs text-slate-400">
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm bg-emerald-400"></span>
              Income
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm bg-rose-400"></span>
              Expenses
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1 w-5 rounded-full bg-blue-400"></span>
              Balance
            </span>
          </div>
        </>
      )}
    </section>
  );
}

export default FinancialChart;
