import axios from "axios";
import { useContext } from "react";
import { MonthContext } from "../utlis/MonthContext";
import errorHandler from "../utils/errorHandler";

function BudgetLimitUpdate({ budgets, limit, setLimit }) {
  const { month } = useContext(MonthContext);

  // user's budget limit  update
  const updateUsersBudgetLimits = async (value) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/v1/user/${budgets.category_id}/my-budgets/${month}-01/update`,
        {
          amount_limit: value,
        },
        {
          withCredentials: true,
        },
      );
    } catch (error) {
      // setError(errorHandler(error));
      console.log(error);
    }
  };

  // Main function for uploading new limit updates. Chains to other functions
  const handleChange = (value) => {
    const numberValue = Number(value);

    setLimit((prev) => ({
      ...prev,
      [budgets.category_id]: numberValue,
    }));

    updateUsersBudgetLimits(numberValue);
  };

  // gets only a number from obj
  const separateObj = (value) => {
    const arrayOfObj = Object.values(limit).map(value => ({
      amount_limit: Number(value),
    }));
    const onlyObj = arrayOfObj[0];

    return onlyObj?.amount_limit;
  };


  //------------------------------------------------------------


  return (
    <>
      <div className="flex justify-between">
        <div>
          <label className="text-white">{budgets.category_name}</label>
        </div>
        <div className="flex items-center p-1">
          <input
            type="number"
            placeholder={budgets.amount_limit}
            value={limit[budgets.category_id] || ""}
            onInput={(e) => handleChange(e.target.value)}
            className="
                  w-28 rounded-xl border border-blue-900
                  bg-[#08132C] px-4 py-2
                  text-white outline-none
                  transition
                  focus:border-blue-500
                  focus:ring-2 focus:ring-blue-500/40
                "
          />
        </div>
      </div>
    </>
  );
}

export default BudgetLimitUpdate;
