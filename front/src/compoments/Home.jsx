import { Link } from "react-router";

function Home() {
    return(
        <>
        <div className="min-h-screen flex flex-col justify-center text-center items-center text-white mx-10">
            <div>
                <h1 className="text-5xl text-center py-3">Take Control of Your Finances with Ease</h1>
                <p className="text-center">BudgetNest helps you track expenses, plan savings, and reach your financial goals — all in one beautiful dashboard.</p>
            </div>
            <Link to="signup" className="bg-blue-400 hover:bg-blue-500 my-5 py-3 px-5 font-bold">Get Started</Link>
        </div>
        <div className="px-6 py-10 text-white bg-indigo-950 ">
            <h2 className="text-4xl text-center py-3">Why Choose BudgetNest?</h2>
            <div className="flex gap-10 m-6">
                <div className="bg-gray-700 border px-4 py-6 mx-10 min-h-40 border-gray-500 rounded-xl">
                    <h3 className="text-2xl">Track Everything</h3>
                    <p className="text-gray-400">Monitor all your income and expenses in real-time with intuitive categorization.</p>
                </div>
                <div className="bg-gray-700 border px-4 py-6 mx-10 min-h-40 border-gray-500 rounded-xl">
                    <h3 className="text-2xl">Smart Savings</h3>
                    <p className="text-gray-400">Set goals and watch your savings grow with automated tracking and insights.</p>
                </div>
                <div className="bg-gray-700 border px-4 py-6 mx-10 min-h-40 border-gray-500 rounded-xl">
                    <h3 className="text-2xl">Visual Reports</h3>
                    <p className="text-gray-400">Beautiful charts and graphs help you understand your financial patterns.</p>
                </div>
            </div>
        </div>
        <div className=" min-h-100 text-center flex flex-col justify-center items-center text-white">
            <div>
                <h2 className="text-4xl py-3">Ready to Take Control?</h2>
                <p>Join thousands of users who have transformed their financial lives with BudgetNest.</p>
            </div>
            <Link to="login" className="bg-blue-400 hover:bg-blue-500 my-5 py-2 px-5 font-bold">Log in</Link>
        </div>
        </>
    )
}

export default Home;