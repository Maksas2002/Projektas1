import { useEffect, useState } from "react";
import axios from "axios";
import ExpensesByCategory from "./ExpensesByCategory";
import errorHandler from "../../utils/errorHandler";
import ExportExpensesBtn from "../ExportExpensesBtn";

function ExpensesTotal() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [month, setMonth] = useState("2026-04");

    const getDateRange = (monthString) => {
        const [year, month] = monthString.split("-");
        const startDate = `${year}-${month}-01`;
        const lastDay = new Date(year, month, 0).getDate();
        const endDate = `${year}-${month}-${String(lastDay).padStart(2, "0")}`;
        return { startDate, endDate };
    };

    const fetchCategoryTotal = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.data?.id;

        const { startDate, endDate } = getDateRange(month);


        const res = await axios.get(`http://localhost:3000/api/v1/user/${userId}/expenses/byCategory?startDate=${startDate}&endDate=${endDate}`,
            {
                withCredentials: true
            }
        )
        setData(res.data.data);
      } catch (error) {
        setError(errorHandler(error));
      }
      finally{
        setLoading(false);
      }
    }

    useEffect(() => {
        fetchCategoryTotal()
    }, [month])
    return(
        <section className="flex flex-col items-center justify-center pt-3 pb-3 gap-2 rounded-[13px] border-[#061a75] bg-[#020b33] border w-full max-w-185 mx-auto">
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="flex w-full justify-around items-center">
                <p className="text-white self-baseline text-[1.2rem]">
                    Expenses Total 
                </p>
                <div>
                    <input
                        type="month"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="bg-[#1f2747] max-w-30 text-white p-2 mr-2 rounded"
                    />
                    <ExportExpensesBtn/>
                </div>
            </div>

            <ExpensesByCategory data={data} loading={loading}/>
            
        </section>
    )
}
export default ExpensesTotal;