import ExpensesByCategory from "./ExpensesByCategory";

function ExpensesTotal() {
    return(
        <section className="flex flex-col items-center justify-center pt-3 pb-3 gap-2 rounded-[13px] border-[#061a75] bg-[#020b33] border w-full max-w-185 mx-auto">
            <p className="text-white self-baseline pl-26 text-[1.2rem]">
                Expenses Total 
            </p>
            <ExpensesByCategory/>
        </section>
    )
}
export default ExpensesTotal;