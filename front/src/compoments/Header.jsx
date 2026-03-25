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

                <Link to="login" className="p-3 bg-blue-400 hover:bg-blue-500">Sign in</Link>
            </>}
        
            {user && <>
                <div>
                    <h3 >My Dashboard</h3>
                    Personal Finance Overview
                </div>
                <div>
                    <button className="bg-blue-400 hover:bg-blue-500 border p-3">Log out</button>
                    <button className="py-3 px-5 text-sm ">Delete your Account</button>
                </div>
            </>}
        </>
    )
}

export default Header;