import { useContext, useEffect } from "react";
import { MonthContext } from "../../utlis/MonthContext";

function MonthSelector({ transaction }) {
  const { month, setMonth } = useContext(MonthContext);

  //  this loop makes the dates appear in the selection. I dont know why it doesnt work without this
  //  pushes all objects into array
  const getAllFormattedDates = () => {
    let list = [];
    for (let i = 0; i < transaction.length; i++) {
      list.push(transaction[i]);
    }
    return list;
  };

  // selects only uinque months
  const uniqueMonths = [
    ...new Set(
      getAllFormattedDates()
        .map((t) => t.formatted_date?.slice(0, 7))
        .filter(Boolean)
    ),
  ];

  // removes month feom text if no noi trasactions exist
//   const removeMonth = () => {
//     if (transaction.length == 0) {
//     setMonth(null);
//     }
//   }


  
  return (
    <select
      // if no transactions → reset month
      value={month || ""}
      onChange={(e) => setMonth(e.target.value)}
      className="border pl-3 pr-3 rounded-[5px] text-white border-[#061a75] bg-[#020b33] h-[0.7cm]"
    >
      <option value="">Select month</option>

      {uniqueMonths.map((m) => (
        <option key={m} value={m}>
          {m}
        </option>
      ))}
    </select>
  );
}

export default MonthSelector;