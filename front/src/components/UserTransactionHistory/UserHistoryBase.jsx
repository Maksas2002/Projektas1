import { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import errorHandler from "../../utils/errorHandler";
import { TransactionContext } from "../../utlis/TransactionContext";
import UserTransactionTable from "./UserTransactionTable";
import EditIncome from "../EditIncome/EditIncome";
import EditExpense from "../EditExpense/EditExpense";
import HistoryCategorySelector from "./HistoryCategorySelector";

function UserHistoryBase() {
  const { transaction, setTransaction } = useContext(TransactionContext);
  const [error, setError] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedIncomeId, setSelectedIncomeId] = useState(null);
  const [isExpenseEditOpen, setExpenseEditOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/user/history",
        {
          withCredentials: true,
          // params: {
          //   category: 2
          // },
        },
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
  }, [setTransaction]);

  // get all categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/categories", {
        withCredentials: true,
      });
      setCategories(res.data);
    } catch (err) {
      console.error("Kategorijų užkrauti nepavyko");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const load = async () => {
      await fetchTransactions();
    };
    load();
  }, [fetchTransactions]);

  const handleEdit = (item) => {
    setSelectedIncomeId(item.id);
    setIsEditOpen(true);
  };

  const handleEditExpense = (item) => {
    setSelectedExpenseId(item.id);
    setExpenseEditOpen(true);
  };

  const handleDeleteFromList = () => {
    fetchTransactions();
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center pt-3 pb-3 gap-2 rounded-[13px] border-[#061a75] bg-[#020b33] border w-full max-w-185 mx-auto">
        <div className="flex relative right-13 gap-50">
          <p className="text-white  pl-26 text-[1.2rem]">Transaction History</p>

          <select className="bg-[#1f2747] text-white p-2 rounded w-[150px] h-[40px]">
            <HistoryCategorySelector key={categories.id} categories={categories}/>
          </select>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {transaction?.length > 0 ? (
          transaction.map((item) => (
            <UserTransactionTable
              key={item.id}
              transaction={item}
              onEdit={handleEdit}
              onEditExpense={handleEditExpense}
              onDelete={handleDeleteFromList}
            />
          ))
        ) : (
          <p className="text-gray-400">No transactions found</p>
        )}

        {isEditOpen && (
          <EditIncome
            isOpen={isEditOpen}
            onToggle={() => setIsEditOpen(false)}
            incomeId={selectedIncomeId}
          />
        )}

        {isExpenseEditOpen && (
          <EditExpense
            isOpen={isExpenseEditOpen}
            onToggle={() => setExpenseEditOpen(false)}
            expenseId={selectedExpenseId}
          />
        )}
      </section>
    </>
  );
}

export default UserHistoryBase;
