import AddIncomeForm from "./AddIncomeForm";

function AddIncome({ isOpen, onToggle }) {
  return (
    <section className="border border-[#1b346c] bg-[#1b2448] rounded-lg p-5 w-full">
      <div className="flex justify-between items-center">
        <p className="text-white text-sm font-medium">Add Income</p>
        <button
          type="button"
          className="py-2 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md text-xs"
          onClick={onToggle}
        >
          {isOpen ? "Close" : "New Income"}
        </button>
      </div>

      {isOpen && <AddIncomeForm />}
    </section>
  );
}

export default AddIncome;
