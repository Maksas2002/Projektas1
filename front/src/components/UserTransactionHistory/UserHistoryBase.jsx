import { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import errorHandler from "../../utils/errorHandler";
import { TransactionContext } from "../../utlis/TransactionContext";
import UserTransactionTable from "./UserTransactionTable";
import EditIncome from "../EditIncome/EditIncome";
import EditExpense from "../EditExpense/EditExpense";
import PeriodFilterModal from "./PeriodFilterModal";

const initialPeriodFilter = {
  type: "expense",
  startDate: "",
  endDate: "",
};

function UserHistoryBase() {
  const { transaction, setTransaction } = useContext(TransactionContext);
  const [error, setError] = useState(null);
  const [periodError, setPeriodError] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedIncomeId, setSelectedIncomeId] = useState(null);
  const [isExpenseEditOpen, setExpenseEditOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const [isPeriodFilterOpen, setIsPeriodFilterOpen] = useState(false);
  const [periodFilter, setPeriodFilter] = useState(initialPeriodFilter);
  const [appliedPeriodFilter, setAppliedPeriodFilter] = useState(null);
  const [periodTotal, setPeriodTotal] = useState(0);

  const fetchTransactions = useCallback(async () => {
    try {
      const periodParams = appliedPeriodFilter
        ? {
            type: appliedPeriodFilter.type,
            startDate: appliedPeriodFilter.startDate,
            endDate: appliedPeriodFilter.endDate,
          }
        : {};

      const response = await axios.get("http://localhost:3000/api/v1/user/history", {
        withCredentials: true,
        params: {
          category: parseInt(category),
          ...periodParams,
        },
      });

      setTransaction(response.data.data);
      setPeriodTotal(response.data.total || 0);
      setError(null);
      setPeriodError(null);
    } catch (error) {
      if (error.response?.status === 404) {
        setTransaction([]);
        setError("No incomes or expenses found");
        return;
      }

      setError(errorHandler(error));
      setPeriodError(errorHandler(error));
    }
  }, [setTransaction, category, appliedPeriodFilter]);

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

  const handlePeriodFilterChange = (field, value) => {
    setPeriodFilter((currentFilter) => ({
      ...currentFilter,
      [field]: value,
    }));
    setPeriodError(null);
  };

  const handleApplyPeriodFilter = () => {
    if (!periodFilter.startDate || !periodFilter.endDate) {
      setPeriodError("Start date and end date are required");
      return;
    }

    if (new Date(periodFilter.startDate) > new Date(periodFilter.endDate)) {
      setPeriodError("Start date cannot be later than end date");
      return;
    }

    setAppliedPeriodFilter(periodFilter);
    setIsPeriodFilterOpen(false);
  };

  const handleClearPeriodFilter = () => {
    setPeriodFilter(initialPeriodFilter);
    setAppliedPeriodFilter(null);
    setPeriodTotal(0);
    setPeriodError(null);
  };

  return (
    <section className="bg-[#1b2448] border border-[#1b346c] rounded-lg p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
        <h2 className="text-white text-base font-medium">Transaction History</h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
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
          <button
            type="button"
            onClick={() => setIsPeriodFilterOpen(true)}
            className="rounded-md border border-[#283046] bg-[#0b1430] px-3 py-2 text-xs text-white hover:border-sky-400 hover:text-sky-200"
          >
            Filter by period
          </button>
        </div>
      </div>

      {error && <p className="text-red-400 text-center text-sm mb-4">{error}</p>}

      {appliedPeriodFilter && (
        <div className="mb-4 flex flex-col gap-2 rounded-md bg-[#0b1430] p-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-300">
            Showing {appliedPeriodFilter.type === "expense" ? "expenses" : "income"} from{" "}
            {appliedPeriodFilter.startDate} to {appliedPeriodFilter.endDate}
          </p>
          <p className="text-sm font-semibold text-white">
            Total: EUR {Number(periodTotal || 0).toFixed(2)}
          </p>
        </div>
      )}

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

      <PeriodFilterModal
        isOpen={isPeriodFilterOpen}
        onClose={() => setIsPeriodFilterOpen(false)}
        periodFilter={periodFilter}
        onChange={handlePeriodFilterChange}
        onApply={handleApplyPeriodFilter}
        onClear={handleClearPeriodFilter}
        total={periodTotal}
        error={periodError}
      />
    </section>
  );
}

export default UserHistoryBase;
