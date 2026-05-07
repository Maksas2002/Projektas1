import { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import errorHandler from "../../utils/errorHandler";
import { TransactionContext } from "../../utlis/TransactionContext";
import UserTransactionTable from "./UserTransactionTable";
import EditIncome from "../EditIncome/EditIncome";
import EditExpense from "../EditExpense/EditExpense";

function UserHistoryBase() {
  const { transaction, setTransaction } = useContext(TransactionContext);
  const [error, setError] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedIncomeId, setSelectedIncomeId] = useState(null);
  const [isExpenseEditOpen, setExpenseEditOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/user/history", {
        withCredentials: true,
        params: {
          category: parseInt(category),
        },
      });

      setTransaction(response.data.data);
      setError(null);
    } catch (error) {
      if (error.response?.status === 404) {
        setTransaction([]);
        setError("No incomes or expenses found");
        return;
      }

      setError(errorHandler(error));
    }
  }, [setTransaction, category]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/categories", {
        withCredentials: true,
      });
      setCategories(res.data);
    } catch (err) {
      console.error("Kategoriju uzkrauti nepavyko");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions, category]);

  const handleEdit = (item) => {
    setSelectedIncomeId(item.id);
    setIsEditOpen(true);
  };

  const handleEditExpense = (item) => {
    setSelectedExpenseId(item.id);
    setExpenseEditOpen(true);
  };

  return (
    <section className="bg-[#1b2448] border border-[#1b346c] rounded-lg p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
        <h2 className="text-white text-base font-medium">Transaction History</h2>
        <select
          value={category || ""}
          onChange={(event) => setCategory(event.target.value || null)}
          className="bg-[#0b1430] text-white text-xs p-2 rounded-md border border-[#283046] w-[170px]"
        >
          <option value="">All Categories</option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-red-400 text-center text-sm mb-4">{error}</p>}

      <div className="flex flex-col gap-3">
        {transaction?.length > 0 ? (
          transaction.map((item) => (
            <UserTransactionTable
              key={`${item.type}-${item.id}`}
              transaction={item}
              onEdit={handleEdit}
              onEditExpense={handleEditExpense}
              onDelete={fetchTransactions}
            />
          ))
        ) : (
          <p className="text-slate-500 text-center py-8">No transactions found</p>
        )}
      </div>

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
  );
}

export default UserHistoryBase;
