import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router";

function Header() {
    const { user } = useContext(UserContext);

    return(
        <>
            {!user&& <>
                <h3 className="text-xl text-blue-500">BudgetNest</h3>

                <Link to="/">Home</Link>

                <Link to="login" className="py-3 px-4 bg-blue-400 hover:bg-blue-500 font-bold">Sign in</Link>
            </>}
        
            {user && <>
                <div>
                    <h3 className="text-2xl">My Dashboard</h3>
                    <p className="text-blue-400">Personal Finance Overview</p>
                </div>
                <div className="flex justify-center items-center">
                    <button className="bg-blue-400 hover:bg-blue-500 mx-3 p-3 font-bold">Log out</button>
                    <button className="bg-red-400  hover:bg-red-500 mx-3 py-3 px-5 text-sm  font-bold">Delete your Account</button>
                </div>
            </>}
        </>
    )
}

export default Header;