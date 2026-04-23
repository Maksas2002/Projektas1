import { useContext, useEffect } from "react";
import { MonthContext } from "../../utlis/MonthContext";

function MonthSelector({ transaction }) {
  const { setMonth } = useContext(MonthContext);

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
        .filter(Boolean),
    ),
  ];

  // upload date to context
  const getMonth = (month) => {
    setMonth(month);
  };


  // if no transactions → reset month
  useEffect(() => {
    if (!uniqueMonths || uniqueMonths.length === 0) {
      setMonth(null);
    }
  }, [transaction, setMonth]);

  return (
    <>
      {uniqueMonths.map((month) => (
        <option
          onClick={() => getMonth(month)}
          key={month}
          value={month}
          className="text-white"
        >
          {month}
        </option>
      ))}
    </>
  );
}

export default MonthSelector;
