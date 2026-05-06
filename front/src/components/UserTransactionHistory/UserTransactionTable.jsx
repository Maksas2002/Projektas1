import DeleteExpense from "../DeleteExpenses.jsx";
import DeleteIncome from "../DeleteIncome";

function UserTransactionTable({ transaction, onEdit, onEditExpense, onDelete }) {
  const isExpense = transaction.type === "expense";
  const amountColor = isExpense ? "text-rose-400" : "text-emerald-400";
  const iconColor = isExpense ? "bg-rose-500/20 text-rose-400" : "bg-emerald-500/20 text-emerald-400";
  const sign = isExpense ? "-" : "+";

  return (
    <div className="flex items-center justify-between gap-4 rounded-md bg-[#0b1430] px-4 py-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className={`h-8 w-8 rounded-md flex items-center justify-center text-xs ${iconColor}`}>
          {isExpense ? "-" : "+"}
        </div>
        <div className="min-w-0">
          <p className="text-white text-sm truncate">{transaction.description}</p>
          <p className="text-slate-500 text-xs truncate">
            {transaction.category_name || transaction.type} · {transaction.formatted_date}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <p className={`${amountColor} text-sm font-semibold`}>
          {sign}EUR {Number(transaction.amount || 0).toFixed(2)}
        </p>
        {transaction.type === "income" ? (
          <button onClick={() => onEdit(transaction)} className="text-sky-300 hover:text-sky-200 text-xs">
            Edit
          </button>
        ) : (
          <button onClick={() => onEditExpense(transaction)} className="text-sky-300 hover:text-sky-200 text-xs">
            Edit
          </button>
        )}
        {transaction.type === "income" ? (
          <DeleteIncome
            userId={transaction.user_id}
            incomeId={transaction.id}
            onDelete={onDelete}
          />
        ) : (
          <DeleteExpense
            userId={transaction.user_id}
            expenseId={transaction.id}
            onDelete={onDelete}
          />
        )}
      </div>
    </div>
  );
}

export default UserTransactionTable;
