function UserTransactionTable({ transaction }) {
  return (
    <>
      <div className="border flex justify-between items-center pt-2 pb-2 pr-2 pl-2 border-white w-[70%]">
        <div>
          <p className="text-white">{transaction.description}</p>
          <div className="flex gap-2">
            <p className="text-white">{transaction.name}</p>
            <p className="text-white">{transaction.date}</p>
          </div>
        </div>
        <p className="text-white ">{transaction.amount}</p>
      </div>
    </>
  );
}

export default UserTransactionTable;
