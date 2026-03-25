import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../utlis/UserContext";
import errorHandler from "../utils/errorHandler";
import axios from "axios";

function LoginForm() {
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/user/login`,
        data,
        {
          withCredentials: true,
        },
      );

      // user
      setUser(response);
      localStorage.setItem("user", JSON.stringify(response));
      reset();
      //   navigate(`/user/${response.data.data.userId}/apointments`);
    } catch (error) {
      setError(errorHandler(error));
    }
  };

  return (
    <>
      <main className="flex justify-center items-center min-h-screen m-0 bg-bg-blue">
        <section>

          <div>
            <h1 className="pt-50 text-center text-white text-[2rem]">Welcome back</h1>
            <p className="text-gray-400 text-center text-[1rem]">Don't have an account? Sign Up</p>
          </div>


          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center pt-10 gap-2"
          >
            <label className="text-white">Email</label>
            <input
              type="text"
              {...register("email", {
                required: true,
                minLength: 3,
                maxLength: 150,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
              className="border block w-90 h-11 rounded-[10px] border-gray-800 bg-input-blue text-gray-500"
              placeholder="example@email.com"
            />
            {errors.email && (
              <span>
                Must contain your email and must be from 3 to 30 characters long
              </span>
            )}

            <label className="text-white">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 3,
                maxLength: 100,
              })}
              className="border block h-11 rounded-[10px] border-gray-800 bg-input-blue  text-gray-500"
            />
            {errors.password && (
              <span>
                Must contain your password and must be from 3 to 100 characters
                long
              </span>
            )}
            <input type="submit" className="border border-none bg-button-blue text-white" value="Login" />
            {error && <p>{error}</p>}
          </form>
        </section>
      </main>
    </>
  );
}

export default LoginForm;
