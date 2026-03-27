import axios from "axios";
import { useNavigate } from "react-router";
import errorHandler from "../../../utils/errorHandler";
import { useContext, useState } from "react";
import { UserContext } from "../../../utlis/UserContext";

function DeleteAccount({ setShowDelete }) {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const { setUser } = useContext(UserContext);

    //deletes your account
    const DeleteYourAccount = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/user/me`, { withCredentials: true });

            setShowDelete(false)
            setUser(null);
            navigate("/login");
        } catch (error) {
            setError(errorHandler(error));
        }
    }

    return(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-white">
            <div className="p-6 border rounded-lg shadow-lg max-w-sm w-full text-center">
                <p className="mb-6 text-lg font-medium">
                    Are you sure you want to delete your account?
                </p>

                <div className="flex gap-4 justify-center">
                        <button
                        onClick={DeleteYourAccount}
                        className="bg-red-400  px-4 py-2 rounded hover:bg-red-500"
                        >
                            Yes
                        </button>

                        <button
                        onClick={() => setShowDelete(false)}
                        className="bg-blue-400 px-4 py-2 rounded hover:bg-blue-500"
                        >
                            No
                        </button>
                </div>
            </div>
        </div>
    );

}

export default DeleteAccount;