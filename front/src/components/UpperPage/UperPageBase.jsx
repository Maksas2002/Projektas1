import MonthSelector from "./MonthSelector";
import { useContext } from "react";
import { UserContext } from "../../utlis/UserContext";
import { MonthContext } from "../../utlis/MonthContext";
import { TransactionContext } from "../../utlis/TransactionContext";
import ExportExpensesBtn from "../ExportExpensesBtn";

function UpperPageBase() {
  const user = useContext(UserContext);
  const { month } = useContext(MonthContext);
  const { transaction } = useContext(TransactionContext);
  const selectedMonth =
    typeof month === "string" && month
      ? month
      : new Date().toISOString().slice(0, 7);
  const [year, monthNumber] = selectedMonth.split("-");
  const startDate = `${selectedMonth}-01`;
  const endDate = `${selectedMonth}-${String(
    new Date(year, monthNumber, 0).getDate()
  ).padStart(2, "0")}`;

  const getUserName = () => {
    return user?.user?.name || user?.user?.data?.name || "User";
  };

  return (
    <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-white text-2xl font-semibold">
          Welcome back, {getUserName()}!
        </h1>
        <p className="text-sky-300 text-sm">
          Here's your financial overview for {selectedMonth}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <MonthSelector transaction={transaction} />
        <ExportExpensesBtn startDate={startDate} endDate={endDate} />
      </div>
    </section>
  );
}

export default UpperPageBase;
