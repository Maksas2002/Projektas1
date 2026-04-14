import axios from "axios";
import errorHandler from "../../..//utils/errorHandler";
import { TransactionContext } from "../../../utlis/TransactionContext";
import { UserContext } from "../../../utlis/UserContext";
import { useNavigate } from "react-router";
import { useState, useContext } from "react";

function UserLogout({ notToShow }) {
  let navigate = useNavigate();
  const { setTransaction } = useContext(TransactionContext);
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  const logoutU = async () => {
    try {
      await axios.get(`http://localhost:3000/api/v1/user/logout`, {
        withCredentials: true,
      });

      localStorage.removeItem("user");
      setTransaction([]);
      setUser(null);
      navigate(`/login`);
    } catch (error) {
      setError(errorHandler(error));
    }
  };

  return (
    <>
      <section className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-white">
        <div className="p-6 border rounded-lg shadow-lg max-w-sm w-full text-center">
          <h2 className="text-white text-center pb-5 text-[1.2rem]">
            Do you want to log out?
          </h2>
          <div className="flex gap-4 justify-center">
            <div>
              <button
                onClick={logoutU}
                className="bg-red-400  px-4 py-2 rounded hover:bg-red-500"
              >
                Yes
              </button>
            </div>

            <div>
              <button
                onClick={notToShow()}
                className="bg-blue-400 px-4 py-2 rounded hover:bg-blue-500"
              >
                No
              </button>
            </div>
          </div>
          <p className="text-center text-red-600">{error}</p>
        </div>
      </section>
    </>
  );
}

export default UserLogout;
