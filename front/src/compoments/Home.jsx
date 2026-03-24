import { Link } from "react-router";

function Home() {
    return(
        <>
        <div className="min-h-screen flex flex-col justify-center text-center items-center">
            <div>
                <h1 className="text-4xl text-center py-3">Take Control of Your Finances with Ease</h1>
                <p className="text-center">BudgetNest helps you track expenses, plan savings, and reach your financial goals — all in one beautiful dashboard.</p>
            </div>
            <Link to="signup" className="border p-3">Get Started</Link>
        </div>
        </>
    )
}

export default Home;