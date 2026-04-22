function MonthSelector({ transaction }) {
  const uniqueMonths = [
    ...new Set(transaction.map((t) => t.formatted_date.slice(0, 7))),
  ];
  return (
    <>
      {uniqueMonths.map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
    </>
  );
}

export default MonthSelector;
