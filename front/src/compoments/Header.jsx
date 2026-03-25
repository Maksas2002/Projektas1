import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router";
import { handleErrors } from "../utils/errorhandling";

const API_URL = import.meta.env.VITE_API_URL;

function Header() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const DeleteYourAccount = async () => {
        try {
            await axios.delete(`${API_URL}/users/me`, { withCredentials: true });

            setShowModal(false)
            setUser(null);
            navigate("/");
        } catch (error) {
            handleErrors(error);
        }
    }

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
                    <button onClick={() => setShowModal(true)} className="bg-red-400  hover:bg-red-500 mx-3 py-3 px-5 text-sm  font-bold">Delete your Account</button>
                </div>
            </>}

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="p-6 border rounded-lg shadow-lg max-w-sm w-full text-center">
                    <p className="mb-6 text-lg font-medium">
                        Are you sure you want to delete your account?
                    </p>

                    <div className="flex gap-4 justify-center">
                        <button
                        onClick={DeleteYourAccount}
                        className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500"
                        >
                        Yes
                        </button>

                        <button
                        onClick={() => setShowModal(false)}
                        className="bg-blue-400 px-4 py-2 rounded hover:bg-blue-500"
                        >
                        No
                        </button>
                    </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default Header;