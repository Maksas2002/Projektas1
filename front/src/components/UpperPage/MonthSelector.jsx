function MonthSelector({ transaction }) {
  //  this loop makes the dates appear in the selection. I dont know why it doesnt work without this
  //  pushes all objects into array
  const getAllFormattedDates = () => {
    let list = [];
    for (let i = 0; i < transaction.length; i++) {
      list.push(transaction[i]);
    }
    return list;
  };

  const uniqueMonths = [
    ...new Set(
      getAllFormattedDates()
        .map((t) => t.formatted_date?.slice(0, 7))
        .filter(Boolean),
    ),
  ];

  return (
    <>
      {uniqueMonths.map((month) => (
        <option key={month} value={month} className="text-white">
          {month}
        </option>
      ))}
    </>
  );
}

export default MonthSelector;
