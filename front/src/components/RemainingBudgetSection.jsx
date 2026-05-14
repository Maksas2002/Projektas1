import { MonthContext } from "../utlis/MonthContext";

function RemainingBudgetSection({categoryId, remainingData}) {
    const category = remainingData.find((item) => item.category_id === categoryId);

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