import UserTransactionTable from "./UserTransactionTable";
import axios from "axios";
import errorHandler from "../../utils/errorHandler";
import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../../utlis/TransactionContext";

function UserHistoryBase() {
  const { setTransaction } = useContext(TransactionContext);
  const transaction = useContext(TransactionContext);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/user/history`,
        {
          withCredentials: true,
        }
      );

      setTransaction(response.data.data);
      setError(null);
    } catch (error) {
      console.log(error);

      if (error.response?.status === 404) {
        setTransaction({ transaction: [] });
        setError("No incomes or expenses found");
        return;
      }

      setError(errorHandler(error));
    }
  };

  const handleDeleteFromList = () => {
    fetchTransactions();
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      <section className="flex flex-col items-center justify-center pt-3 pb-3 gap-2 rounded-[13px] border-[#061a75] bg-[#020b33] border w-full max-w-[740px] mx-auto">
        <p className="text-white self-baseline pl-26 text-[1.2rem]">
          Transaction History
        </p>

        <p className="text-red-500 text-center">{error}</p>

        {transaction?.transaction?.length > 0 &&
          transaction.transaction.map((transaction) => (
            <UserTransactionTable
              key={`${transaction.type}-${transaction.id}`}
              transaction={transaction}
              onDelete={handleDeleteFromList}
            />
          ))}
      </section>
    </>
  );
}

export default UserHistoryBase;