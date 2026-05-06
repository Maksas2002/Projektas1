import { useState } from "react";
import UpperPageBase from "../components/UpperPage/UperPageBase";
import MonthlyFinanciesBase from "../components/MonthlyFInancies/MonthlyFinanciesBase";
import UserHistoryBase from "../components/UserTransactionHistory/UserHistoryBase";
import DashHeader from "../components/Header/DashHeader/DashHeader";
import AddIncome from "../components/AddIncome/AddIncome";
import AddExpense from "../components/AddExpense/AddExpense";
import ExpensesTotal from "../components/ExpensesTotal/ExpensesTotal";
import BudgetSection from "../components/BudgetSection"; 
import RemainingBudgetSection from "../components/RemainingBudgetSection";

function DashBoard() {
  const [activeForm, setActiveForm] = useState(null);
  const toggleForm = (formName) => setActiveForm(activeForm === formName ? null : formName);

  return (
    <main className="min-h-screen bg-[#01081f] pb-20">
      <DashHeader />
      
      {/* Pagrindinis konteineris su vertikaliais tarpais (gap-12) */}
      <div className="max-w-[1400px] mx-auto px-5 pt-8 flex flex-col gap-12">
        
        <UpperPageBase />
        <MonthlyFinanciesBase />

        {/* Biudžeto sekcija gauna pilną plotį */}
        <section className="w-full">
          <BudgetSection />
          <RemainingBudgetSection/>
        </section>

        {/* Formų mygtukai */}
        <div className="flex flex-wrap justify-center gap-10">
          <AddIncome isOpen={activeForm === 'income'} onToggle={() => toggleForm('income')} />
          <AddExpense isOpen={activeForm === 'expense'} onToggle={() => toggleForm('expense')} />
        </div>

        <UserHistoryBase />
        <ExpensesTotal />
      </div>
    </main>
  );
}

export default DashBoard;