import { useContext } from "react";
import { MonthContext } from "../../utlis/MonthContext";

function MonthSelector({ transaction }) {
  const { month, setMonth } = useContext(MonthContext);
  const currentMonth = new Date().toISOString().slice(0, 7);
  const uniqueMonths = [
    ...new Set(
      (transaction || [])
        .map((t) => t.formatted_date?.slice(0, 7))
        .filter(Boolean)
    ),
  ];
  const months = uniqueMonths.includes(currentMonth)
    ? uniqueMonths
    : [currentMonth, ...uniqueMonths];

  return (
    <select
      value={month || currentMonth}
      onChange={(e) => setMonth(e.target.value)}
      className="border border-[#283046] pl-3 pr-3 rounded-md text-white bg-[#0b1430] h-9 text-xs min-w-[150px]"
    >
      {months.map((m) => (
        <option key={m} value={m}>
          {new Date(`${m}-01`).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </option>
      ))}
    </select>
  );
}

export default MonthSelector;
