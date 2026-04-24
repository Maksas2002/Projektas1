import { createContext, useState } from "react";

export const IncomeContext = createContext();

export const IncomeContextProvider = ({ children }) => {
  const [income, setIncome] = useState([]);

  return (
    <IncomeContext value={{ income, setIncome }}>
      {children}
    </IncomeContext>
  );
};
