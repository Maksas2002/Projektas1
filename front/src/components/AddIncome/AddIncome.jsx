import AddIncomeForm from "./AddIncomeForm";
import { useState } from "react";

function AddIncome() {
  const [show, setShow] = useState(false);

  const toShow = () => {
    show ? setShow(false) : setShow(true);
  };

  return (
    <>
      <section className="border p-8 ml-2 w-[45%]">
        <button type="button" onClick={toShow}>Add Income</button>

        {show ? <AddIncomeForm /> : null}
      </section>
    </>
  );
}

export default AddIncome;
