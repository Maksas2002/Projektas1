import MonthlyBalance from "./MonthlyBalance";
import MonthlyExpenses from "./MonthlyExpenses";
import MonthlyIncome from "./MonthlyIncome";


function MonthlyFinanciesBase() {
  return (
    <>
      <section className="flex justify-center gap-3 relative top-9">
        <MonthlyBalance/>
        <MonthlyIncome/>
        <MonthlyExpenses />
      </section>
    </>
  );
}

export default MonthlyFinanciesBase;
