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
      <div style={{color: colorChange()}} className="border flex justify-between items-center pt-2 pb-2 pr-2 pl-2 w-[70%]">
        <div>
          <p className="text-white">{transaction.description}</p>
          <div className="flex gap-2">
            <p className="text-white">{transaction.name}</p>
            <p className="text-white">{transaction.date}</p>
          </div>
        </div>
        <p className="text-white ">{transaction.amount}€</p>
      </div>
    </>
  );
}

export default UserTransactionTable;
