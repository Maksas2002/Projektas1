import axios from "axios";
import { useContext } from "react";
import { MonthContext } from "../utlis/MonthContext";
import errorHandler from "../utils/errorHandler";

function BudgetLimitUpdate({ budgets, limit, setLimit }) {
  const { month } = useContext(MonthContext);
  const handleChange = (value) => {
    setLimit((prev) => ({
      ...prev,
      [budgets.category_id]: value,
    }));
  };

  // user's budget limit  update
  const updateUsersBudgetLimits = async () => {
    try {
      await axios.patch(
        `http://localhost:3000/api/v1/user/${budgets.category_id}/my-budgets/${month}/update`,
        {
          amount_limit: limit,
        },
        {
          withCredentials: true,
        },
      );
    } catch (error) {
        setError(errorHandler(error));
    }
  };

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
            onChange={(e) => handleChange(e.target.value)}
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
