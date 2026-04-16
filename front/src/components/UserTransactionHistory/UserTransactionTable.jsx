import DeleteIncome from "../DeleteIncome";

function UserTransactionTable({ transaction }) {
  // change colors basesd if its income or expense
  const colorChange = () => {
    if (transaction.type === "expense") {
      return "red";
    } else if (transaction.type === "income") {
      return "green";
    }
  };

  return (
    <>
      <div style={{color: colorChange()}} className="border flex justify-between items-center pt-2 pb-2 pr-2 pl-2 w-[70%] rounded-[13px] bg-[#070c20]">
        <div>
          <p className="text-white">{transaction.description}</p>
          <div className="flex gap-2">
            <p className="text-sky-400">{transaction.category_name}</p>
            <p className="text-sky-400">{transaction.formatted_date}</p>
          </div>
        </div>
        <p style={{color: colorChange()}} className="text-white">€{transaction.amount}</p>

        <div>
          { transaction.type === "income" ? <DeleteIncome userId={transaction.user_id} incomeId={transaction.id}/> : <p className="text-sm ">expense delete</p>}
        </div>
      </div>
    </>
  );
}

export default UserTransactionTable;
