import MonthSelector from "./MonthSelector";
import { useContext } from "react";
import { UserContext } from "../../utlis/UserContext";
import { TransactionContext } from "../../utlis/TransactionContext";

function UpperPageBase() {
  const user = useContext(UserContext);
  const { transaction } = useContext(TransactionContext);

  // get name from context
  const getUserName = () => {
    return user?.user?.name || user?.user?.data?.name || null;
  };

  return (
    <>
      <section className="flex justify-around">
        <div>
          <h1 className="text-white text-[1.5rem]">
            Welckome back, {getUserName()}
          </h1>
          <p className="text-sky-400">
            Here's your financial overview for month
          </p>
        </div>

        <section>
          <select className="border text-white border-[#061a75] bg-[#020b33] h-[0.7cm]">
          <MonthSelector transaction={transaction} />
          </select>
        </section>
      </section>
    </>
  );
}

export default UpperPageBase;
