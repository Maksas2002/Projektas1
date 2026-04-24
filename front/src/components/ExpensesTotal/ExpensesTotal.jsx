import { useEffect, useState } from "react";
import axios from "axios";
import ExpensesByCategory from "./ExpensesByCategory";
import errorHandler from "../../utils/errorHandler";

function ExpensesTotal() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const startDate = '2026-04-01';
    const endDate = '2026-04-30';

    const fetchCategoryTotal = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.data?.id;
        console.log(userId)
        const res = await axios.get(`http://localhost:3000/api/v1/user/${userId}/expenses/byCategory?startDate=${startDate}&endDate=${endDate}`,
            {
                withCredentials: true
            }
        )
        console.log(res.data.data)

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
    }, [])
    return(
        <section className="flex flex-col items-center justify-center pt-3 pb-3 gap-2 rounded-[13px] border-[#061a75] bg-[#020b33] border w-full max-w-185 mx-auto">
            {error && <p className="text-red-500 text-center">{error}</p>}
            <p className="text-white self-baseline pl-26 text-[1.2rem]">
                Expenses Total 
            </p>
            <ExpensesByCategory data={data} loading={loading}/>
            
        </section>
    )
}
export default ExpensesTotal;