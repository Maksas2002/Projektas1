import axios from "axios";
import errorHandler from "../../utils/errorHandler";
import { UserContext } from "../../utlis/UserContext";
import { useNavigate } from "react-router";
import { useState, useContext } from "react";



function UserLogout({ notToShow }) {
    let navigate = useNavigate();
    const { setUser, user } = useContext(UserContext);
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
            <section className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black p-50">
                <h2 className="text-white text-center pb-5">Do you want to log out?</h2>
                <div className="flex gap-22">
                    <div>
                        <button onClick={logoutU} className="text-white border p-2">
                            Yes
                        </button>
                    </div>

                    <div>
                        <button onClick={notToShow()} className="text-white border p-2">
                            No
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default UserLogout;