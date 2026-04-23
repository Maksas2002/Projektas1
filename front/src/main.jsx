import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UserContextProvider } from "./utlis/UserContext.jsx";
import { BrowserRouter } from "react-router";
import { TransactionContextProvider } from "./utlis/TransactionContext.jsx";
import { MonthContextProvider } from "./utlis/MonthContext.jsx";
import { BalanceContextProvider } from "./utlis/BalanceContext.jsx";
import { IncomeContextProvider } from "./utlis/IncomeContext.jsx";
import { ExpensesContextProvider } from "./utlis/ExpensesContext.jsx";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          <ToastContainer
            autoClose={3000}
            theme="dark"
            toastClassName="rounded-xl border border-slate-700 bg-[#1e293b] text-white shadow-xl"
            bodyClassName="text-sm font-medium"
          />
        </TransactionContextProvider>
      </BrowserRouter>
    </UserContextProvider>
  </StrictMode>,
);
