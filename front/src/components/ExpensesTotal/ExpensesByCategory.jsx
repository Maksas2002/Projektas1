
function ExpensesByCategory({data, loading}) {

    if (loading){
        return <div className="text-white">Loading...</div>
    }

    if (!data || data.length === 0){
        return <div className="text-white">No expenses found for this date range.</div>
    }
    return(
        <>
            <div className="flex flex-col gap-2 w-full justify-center items-center">
                {data.map((item) =>(
                    <div key={item.category_name} className="border flex justify-between items-center pt-2 pb-2 pr-2 pl-2 w-[70%] rounded-[13px] bg-[#070c20]">
                        <span className="text-white">{item.category_name}</span>
                        <span className="text-red-500">€{item.total}</span>
                    </div>
                ))}
            </div>
        </>
    )
}
export default ExpensesByCategory;