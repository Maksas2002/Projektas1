import MonthSelector from "./MonthSelector";
import { useContext } from "react";
import { UserContext } from "../../utlis/UserContext";
import { MonthContext } from "../../utlis/MonthContext";
import { TransactionContext } from "../../utlis/TransactionContext";

function UpperPageBase() {
  const user = useContext(UserContext);
  const month  = useContext(MonthContext);
  const { transaction } = useContext(TransactionContext);

  // get name from context
  const getUserName = () => {
    return user?.user?.name || user?.user?.data?.name || null;
  };


  return (
    <>
      <section className="flex justify-around gap-55 pt-10">
        <div>
          <h1 className="text-white text-[1.5rem]">
            Welcome back, {getUserName()}
          </h1>
          <p className="text-sky-400">Here's your financial overview for {month.month}</p>
        </div>

        <section className="relative right-3">
            <MonthSelector transaction={transaction} />
        </section>
      </section>
    </>
  );
}

export default UpperPageBase;
