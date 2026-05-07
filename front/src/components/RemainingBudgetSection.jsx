import axios from "axios";
import { useEffect, useState } from "react";

// function RemainingBudgetSection() {
    // const [month, setMonth] = useState("");
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     const fetchRemaining = async () => {
    //         //checks if there is month
    //         if (!month) {
    //             const now = new Date();
    //             const year = now.getFullYear();
    //             const monthNum = String(now.getMonth() + 1).padStart(2, "0");
    //             setMonth(`${year}-${monthNum}`);
    //             return; // stop here, next render will fetch
    //         }

    //         //then fetch the info of remaining budget
    //         try {
    //             const response = await axios.get(
    //                 `http://localhost:3000/api/v1/user/remaining-budget?month=${month}`,
    //                 {withCredentials: true}
    //             );

    //             setData(response.data.data);
    //         } catch (error) {
    //             console.error("Error fetching remaining budget:", error);
    //         }
    //     }
    //     fetchRemaining();
    // }, [month])

//     return(
//         <div className="bg-[#161d31] p-8 rounded-2xl border border-[#283046] mt-6 shadow-xl">
//             <div className="flex justify-between items-center mb-8">
//                 <h2 className="text-white text-xl font-medium tracking-tight">
//                 Remaining Budget
//                 </h2>

//                 <input
//                 type="month"
//                 value={month}
//                 onChange={(e) => setMonth(e.target.value)}
//                 className="bg-[#101627] text-white p-2 rounded border border-[#283046]"
//                 />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {data.length > 0 ? (
//                 data.map((item) => {
//                     const used = Number(item.total_spent);
//                     const limit = Number(item.budget_limit);
//                     const remaining = Number(item.remaining);
//                     const percent = limit > 0 ? Math.min((used / limit) * 100, 100) : 0;

//                     const isOver = used >= limit && limit > 0;

//                     return (
//                     <div
//                         key={item.category_id}
//                         className={`bg-[#101627] p-6 rounded-xl border transition-all ${
//                         isOver
//                             ? "border-red-500/50"
//                             : "border-[#283046] hover:border-[#3b4461]"
//                         }`}
//                     >
//                         <div className="flex justify-between items-center mb-4 text-sm font-medium">
//                         <span className="text-slate-300">{item.category_name}</span>
//                         <span className={isOver ? "text-red-500" : "text-[#7367f0]"}>
//                             €{used}{" "}
//                             <span className="text-slate-500 font-normal">
//                             / €{limit}
//                             </span>
//                         </span>
//                         </div>

//                         <div className="w-full bg-[#1e293b] h-1.5 rounded-full overflow-hidden mb-3">
//                         <div
//                             className={`h-full rounded-full transition-all duration-1000 ${
//                             isOver ? "bg-red-500" : "bg-[#7367f0]"
//                             }`}
//                             style={{ width: `${percent}%` }}
//                         ></div>
//                         </div>

//                         <div className="text-slate-400 text-xs mt-2">
//                         Remaining:{" "}
//                         <span className={remaining < 0 ? "text-red-500" : "text-green-400"}>
//                             €{remaining}
//                         </span>
//                         </div>
//                     </div>
//                     );
//                 })
//                 ) : (
//                 <div className="col-span-full py-10 text-center text-slate-500 italic border border-dashed border-[#283046] rounded-xl">
//                     No budgets found for this month.
//                 </div>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default RemainingBudgetSection;

function RemainingBudgetSection({ categoryId }) {
    const [month, setMonth] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchRemaining = async () => {
            //checks if there is month
            if (!month) {
                const now = new Date();
                const year = now.getFullYear();
                const monthNum = String(now.getMonth() + 1).padStart(2, "0");
                setMonth(`${year}-${monthNum}`);
                return; // stop here, next render will fetch
            }

            //then fetch the info of remaining budget
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
    }, [month])

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