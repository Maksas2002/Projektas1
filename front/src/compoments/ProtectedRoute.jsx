import { Link } from "react-router";
import { UserContext } from "../contexts/UserContext.jsx";
import { useContext } from "react";


function ProtectedRoute({children}) {
    const {user} = useContext(UserContext);

    return user?children: <h1 className="text-2xl text-center text-white mt-5">Please <Link className="text-blue-400 hover:text-blue-500" to="/login">log in</Link>, to access.</h1>;
}

export default ProtectedRoute;