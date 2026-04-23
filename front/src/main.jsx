import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UserContextProvider } from "./utlis/UserContext.jsx";
import { BrowserRouter } from "react-router";
import { TransactionContextProvider } from "./utlis/TransactionContext.jsx";
import { MonthContextProvider } from "./utlis/MonthContext.jsx";
import { BalanceContextProvider } from "./utlis/BalanceContext.jsx";
import { IncomeContextProvider } from "./utlis/IncomeExpenses.jsx";
import { ExpensesContextProvider } from "./utlis/ExpensesContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <TransactionContextProvider>
          <MonthContextProvider>
            <BalanceContextProvider>
              <IncomeContextProvider>
                <ExpensesContextProvider>
                  <App />
                </ExpensesContextProvider>
              </IncomeContextProvider>
            </BalanceContextProvider>
          </MonthContextProvider>
        </TransactionContextProvider>
      </BrowserRouter>
    </UserContextProvider>
  </StrictMode>,
);
