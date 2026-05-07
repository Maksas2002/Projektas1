import AddExpenseForm from "./AddExpenseForm";

function AddExpense({ isOpen, onToggle }) {
  return (
    <section className="border border-[#1b346c] bg-[#1b2448] rounded-lg p-5 w-full">
      <div className="flex justify-between items-center">
        <p className="text-white text-sm font-medium">Add Expense</p>
        <button
          type="button"
          className="py-2 px-4 bg-rose-500 hover:bg-rose-600 text-white rounded-md text-xs"
          onClick={onToggle}
        >
          {isOpen ? "Close" : "New Expense"}
        </button>
      </div>

      {isOpen && <AddExpenseForm />}
    </section>
  );
}

export default AddExpense;
