import { createContext, useState } from "react";

export const BalanceContext = createContext();

export const BalanceContextProvider = ({ children }) => {
  const [balance, setBalance] = useState([]);

  return (
    <BalanceContext value={{ balance, setBalance }}>
      {children}
    </BalanceContext>
  );
};
