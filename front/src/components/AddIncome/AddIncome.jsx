import AddIncomeForm from "./AddIncomeForm";
import plus from "../../assets/plus-circle.svg";

function AddIncome({ isOpen, onToggle }) { 
  return (
    <section className="border border-green-500 bg-[#020b33] rounded-[20px] p-8 mt-5 w-[350px]">
      <div className="flex justify-between items-center mb-4">
        <p className="text-white text-[1.2rem]">Add Income</p>
        <button
          type="button"
          className="flex items-center gap-2 py-1 px-3 bg-green-600 hover:bg-green-700 text-white rounded-[6px]"
          onClick={onToggle}
        >
          <img src={plus} alt="plus" className="w-4 h-4 brightness-0 invert" />
          {isOpen ? "Close" : "Add Income"}
        </button>
      </div>

      {isOpen && <AddIncomeForm />}
    </section>
  );
}

export default AddIncome;