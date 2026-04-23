import { createContext, useState } from "react";

export const ExpensesContext = createContext();

export const ExpensesContextProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  return (
    <ExpensesContext value={{ expenses, setExpenses }}>
      {children}
    </ExpensesContext>
  );
};
