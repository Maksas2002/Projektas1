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
      const response = await axios.post(`http://localhost:3000/api/v1/user/login`, data, {
        withCredentials: true
      });

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
      <main>
        <header className="text-center ">
          <Link to="/">
            <h1 className="pt-10">Pet Clinic</h1>
          </Link>
        </header>
        <section>
          <h1 className="pt-50 text-center">Login form</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-center pt-10 gap-2"
          >
            <label>Your Email</label>
            <input
              type="text"
              {...register("email", {
                required: true,
                minLength: 3,
                maxLength: 150,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
              className="border block"
              placeholder="example@email.com"
            />
            {errors.email && (
              <span>
                Must contain your email and must be from 5 to 30 characters long
              </span>
            )}

            <label>Your password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 3,
                maxLength: 100,
              })}
              className="border block"
            />
            {errors.emailAddress && (
              <span>
                Must contain your password and must be from 2 to 100 characters
                long
              </span>
            )}
            <input type="submit" className="border" value="Login" />
            {error && <p>{error}</p>}
          </form>
        </section>
      </main>
    </>
  );
}

export default LoginForm;
