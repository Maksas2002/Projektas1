import UserTransactionTable from "./UserTransactionTable";
import axios from "axios";
import errorHandler from "../../utils/errorHandler";
import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../../utlis/TransactionContext";

function UserHistoryBase() {
  const { setTransaction } = useContext(TransactionContext);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/user/history`, {
        withCredentials: true,
      });
    //   const income = response.data.incomeData
    //   const expenses = response.data.incomeData.expensesData
    //   console.log({income});
      setTransaction(response.data.incomeData);
    } catch (error) {
        console.log(error);
      setError(errorHandler(error));
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      <section className="flex justify-center border-red-500 border ml-200 mr-200">
        <p className="text-red text-center">{error}</p>
        <UserTransactionTable />
      </section>
    </>
  );
}

export default UserHistoryBase;
