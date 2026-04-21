import { useState } from "react";
import MonthlyFinanciesBase from "../components/MonthlyFInancies/MonthlyFinanciesBase";
import UserHistoryBase from "../components/UserTransactionHistory/UserHistoryBase";
import DashHeader from "../components/Header/DashHeader/DashHeader";
import AddIncome from "../components/AddIncome/AddIncome";
import AddExpense from "../components/AddExpense/AddExpense";

function DashBoard() {
  const [activeForm, setActiveForm] = useState(null);

  const toggleForm = (formName) => {
    setActiveForm(activeForm === formName ? null : formName);
  };

  return (
    <main className="min-h-screen bg-[#01081f]">
      <DashHeader />
      
      <MonthlyFinanciesBase/>

      <div className="flex flex-wrap justify-center gap-10 p-5 pt-10">
        <AddIncome 
          isOpen={activeForm === 'income'} 
          onToggle={() => toggleForm('income')} 
        />
        <AddExpense 
          isOpen={activeForm === 'expense'} 
          onToggle={() => toggleForm('expense')} 
        />
      </div>

      <UserHistoryBase/>
    </main>
  );
}

export default DashBoard;