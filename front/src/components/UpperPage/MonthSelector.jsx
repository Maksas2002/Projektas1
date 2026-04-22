function MonthSelector({ transaction }) {
const uniqueMonths = transaction?.transactions?.length
  ? [...new Set(transaction.transactions.map(t => t.formatted_date.slice(0, 7)))]
  : [];

  return (
    <>
      {uniqueMonths.map((month) => (
        <option key={month} value={month} className="text-white">
          {month ? month : null}
        </option>
      ))}
    </>
  );
}

export default MonthSelector;
