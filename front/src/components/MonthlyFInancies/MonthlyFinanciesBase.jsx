import MonthlyBalance from "./MonthlyBalance";
import MonthlyExpenses from "./MonthlyExpenses";
import MonthlyIncome from "./MonthlyIncome";

function MonthlyFinanciesBase() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4">
      <MonthlyBalance />
      <MonthlyIncome />
      <MonthlyExpenses />
    </section>
  );
}

export default MonthlyFinanciesBase;
