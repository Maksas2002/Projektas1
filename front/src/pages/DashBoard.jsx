import { useState } from "react";
import UpperPageBase from "../components/UpperPage/UperPageBase";
import MonthlyFinanciesBase from "../components/MonthlyFInancies/MonthlyFinanciesBase";
import UserHistoryBase from "../components/UserTransactionHistory/UserHistoryBase";
import DashHeader from "../components/Header/DashHeader/DashHeader";
import AddIncome from "../components/AddIncome/AddIncome";
import AddExpense from "../components/AddExpense/AddExpense";
import ExpensesTotal from "../components/ExpensesTotal/ExpensesTotal";

function DashBoard() {
  const [activeForm, setActiveForm] = useState(null);

  const toggleForm = (formName) => {
    setActiveForm(activeForm === formName ? null : formName);
  };

  return (
    <main className="min-h-screen bg-[#01081f]">
      <DashHeader />

      <UpperPageBase/>
      
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
      
      <div className="my-7">
        <ExpensesTotal/>
      </div>
    </main>
  );
}

export default DashBoard;