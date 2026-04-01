import AddIncomeForm from "./AddIncomeForm";
import { useState } from "react";

function AddIncome() {
  const [show, setShow] = useState(false);

  const toShow = () => {
    show ? setShow(false) : setShow(true);
  };

  return (
    <>
      <section className="border border-green-500 bg-[#020b33] rounded-[20px] p-8 mt-5 w-[25%]">
        <div className="flex justify-between">
          <p className="text-white text-[1.2rem]">Add Income</p>
          <button
            type="button"
            className="border block pb-1 pt-1 pr-1 pl-1 border-green-600 hover:bg-green-500 cursor-pointer rounded-[6px] bg-green-400 text-white"
            onClick={toShow}
          >
            Add Income
          </button>
        </div>

        {show ? <AddIncomeForm /> : null}
      </section>
    </>
  );
}

export default AddIncome;
