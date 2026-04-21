import EditExpenseForm from "./EditExpenseForm";
import plus from "../../assets/plus-circle.svg";

function EditExpense({ isOpen, onToggle, expenseId }) {
  return (
    <section className="border border-yellow-500 bg-[#020b33] rounded-[20px] p-8 mt-5 w-87.5">
      <div className="flex justify-between items-center mb-4">
        <p className="text-white text-[1.2rem]">Edit Expense</p>

        <button
          type="button"
          className="flex items-center gap-2 py-1 px-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md"
          onClick={onToggle}
        >
          <img src={plus} alt="plus" className="w-4 h-4 brightness-0 invert" />
          {isOpen ? "Close" : "Edit Expense"}
        </button>
      </div>

      {isOpen && <EditExpenseForm expenseId={expenseId} onClose={onToggle} />}
    </section>
  );
}

export default EditExpense;
