import { useState } from "react";
import UpperPageBase from "../components/UpperPage/UperPageBase";
import MonthlyFinanciesBase from "../components/MonthlyFInancies/MonthlyFinanciesBase";
import UserHistoryBase from "../components/UserTransactionHistory/UserHistoryBase";
import DashHeader from "../components/Header/DashHeader/DashHeader";
import AddIncome from "../components/AddIncome/AddIncome";
import AddExpense from "../components/AddExpense/AddExpense";
import ExpensesTotal from "../components/ExpensesTotal/ExpensesTotal";
import BudgetSection from "../components/BudgetSection"; 

function DashBoard() {
  const [activeForm, setActiveForm] = useState(null);
  
  // Nustatome dinaminę dabartinio mėnesio datą (pvz. "2026-05")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 7));

  const toggleForm = (formName) => setActiveForm(activeForm === formName ? null : formName);

  return (
    <main className="min-h-screen bg-[#061126] pb-20">
      <DashHeader />
      
      <div className="max-w-[980px] mx-auto px-4 pt-6 flex flex-col gap-5">
        
        {/* Perduodame datą ir jos keitimo funkciją */}
        <UpperPageBase 
          selectedDate={selectedDate} 
          onDateChange={setSelectedDate} 
        />

        <MonthlyFinanciesBase selectedDate={selectedDate} />

        <section className="w-full">
          <BudgetSection selectedDate={selectedDate} />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AddIncome isOpen={activeForm === 'income'} onToggle={() => toggleForm('income')} />
          <AddExpense isOpen={activeForm === 'expense'} onToggle={() => toggleForm('expense')} />
        </div>

        <ExpensesTotal />
        <UserHistoryBase selectedDate={selectedDate} />
      </div>
    </main>
  );
}

export default DashBoard;
