import AddIncomeForm from "./AddIncomeForm";
import { useState } from "react";

function AddIncome() {
  const [show, setShow] = useState(false);

  const toShow = () => {
    show ? setShow(false) : setShow(true);
  };

  return (
    <>
      <section className="border p-8 mt-5 w-[25%]">
        <div className="flex justify-between">
          <p>Add Income</p>
          <button type="button" className="border block" onClick={toShow}>
            Add Income
          </button>
        </div>

        {show ? <AddIncomeForm /> : null}
      </section>
    </>
  );
}

export default AddIncome;
