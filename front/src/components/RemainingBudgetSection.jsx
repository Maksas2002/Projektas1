import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MonthContext } from "../utlis/MonthContext";
import { TransactionContext } from "../utlis/TransactionContext";

function RemainingBudgetSection({ categoryId, limit }) {
    const { month } = useContext(MonthContext);
    const { transaction } = useContext(TransactionContext);
    const [data, setData] = useState([]);
  

    useEffect(() => {
        const fetchRemaining = async () => {
            //fetch the info of remaining budget of month
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/v1/user/remaining-budget?month=${month}`,
                    {withCredentials: true}
                );

                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching remaining budget:", error);
            }
        }
        fetchRemaining();
    }, [month, transaction, limit])

    const category = data.find((item) => item.category_id === categoryId);

    if(!category){
        return(
            <div className="text-slate-400 text-xs mt-2">
                Remaining: <span>€0</span>
            </div>
        )
    }

    const remaining = Number(category.remaining);

    return (
        <div className="text-slate-400 text-xs mt-2">
            Remaining:{" "}
            <span className={remaining < 0 ? "text-red-500" : "text-green-400"}>
                €{remaining}
            </span>
        </div>
    );
}
export default RemainingBudgetSection;