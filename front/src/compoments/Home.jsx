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
        </>
    )
}

export default Home;