import axios from "axios";
import errorHandler from "../../..//utils/errorHandler"
import { UserContext } from "../../../utlis/UserContext";
import { useNavigate } from "react-router";
import { useState, useContext } from "react";



function UserLogout({ notToShow }) {
    let navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState(null);

    const logoutU = async () => {
        try {
            await axios.get(`http://localhost:3000/api/v1/user/logout`, {
                withCredentials: true,
            });
            
            localStorage.removeItem("user");
            setUser(null);
            navigate(`/login`);
        } catch (error) {
            setError(errorHandler(error));
        }
    }

    return (
        <>
            <section className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#020b33] rounded-[10px] p-50">
                <h2 className="text-white text-center pb-5 text-[1.2rem]" >Do you want to log out?</h2>
                <div className="flex gap-31">
                    <div>
                        <button onClick={logoutU} className="text-white border hover:bg-red-500 border-red-600 rounded-[10px] p-2">
                            <span className="text-red-600">Yes</span>
                        </button>
                    </div>

                    <div>
                        <button onClick={notToShow()} className="text-white border  hover:bg-green-500 border-green-600 rounded-[10px] p-2">
                            <span className="text-green-600">No</span>
                        </button>
                    </div>
                </div>
                <p className="text-center text-red-600">{error}</p>
            </section>
        </>
    );
}

export default UserLogout;