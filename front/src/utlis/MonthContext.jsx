import { createContext, useState } from "react";

export const MonthContext = createContext();

export const MonthContextProvider = ({ children }) => {
  const [month, setMonth] = useState([]);

  return (
    <MonthContext value={{ month, setMonth }}>
      {children}
    </MonthContext>
  );
};
