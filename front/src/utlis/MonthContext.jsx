import { createContext, useState, useEffect } from "react";

export const MonthContext = createContext();

export const MonthContextProvider = ({ children }) => {
  const [month, setMonth] = useState(() => {
    // load from localStorage on first render
    const savedMonth = localStorage.getItem("month");
    return savedMonth ? JSON.parse(savedMonth) : new Date().toISOString().slice(0, 7);
  });

  useEffect(() => {
    // save to localStorage whenever month changes
    localStorage.setItem("month", JSON.stringify(month));
  }, [month]);

  return (
    <MonthContext.Provider value={{ month, setMonth }}>
      {children}
    </MonthContext.Provider>
  );
};
