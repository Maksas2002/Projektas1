import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { UserContext } from "../utlis/UserContext";
import errorHandler from "../utils/errorHandler";
import axios from "axios";

function LoginForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      setError(null);

      const response = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        formData,
        { withCredentials: true },
      );

      const authResponse = response.data;

      // Išsaugome visą objektą (su tokenu)
      localStorage.setItem("user", JSON.stringify(authResponse));

      // Atnaujiname vartotojo būseną kontekste
      setUser(authResponse.data);

      reset();

      if (authResponse.data && authResponse.data.role === "Admin") {
        navigate("/adminpage");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      setError(errorHandler(err));
    }
  };

  return (
    <div className="min-h-screen bg-[#020b33] text-white flex flex-col">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-2xl font-semibold text-blue-400">
            BudgetNest
          </Link>
          <nav>
            <Link to="/" className="text-sm text-white hover:text-blue-300">
              Home
            </Link>
          </nav>
          <Link
            to="/login"
            className="rounded-[10px] bg-blue-500 px-5 py-2 text-sm font-medium text-white"
          >
            Sign In
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-14">
        <section className="w-full max-w-md">
          <div>
            <h1 className="text-center text-[2.5rem] font-semibold text-white">
              Welcome back
            </h1>
            <p className="mt-2 text-center text-[1rem] text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-400">
                Sign Up
              </Link>
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center gap-4 pt-10"
          >
            <div>
              <label className="mb-2 block text-white">Email</label>
              <input
                type="text"
                placeholder="tim@budgetnest.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className="block h-12 w-full rounded-[10px] border border-white/10 bg-[#1f2747] px-3 text-gray-300 outline-none"
              />
              {errors.email && (
                <span className="mt-2 block text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label className="mb-2 block text-white">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 3, message: "Too short" },
                })}
                className="block h-12 w-full rounded-[10px] border border-white/10 bg-[#1f2747] px-3 text-gray-300 outline-none"
              />
              {errors.password && (
                <span className="mt-2 block text-sm text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="mt-2 cursor-pointer rounded-[10px] bg-blue-500 p-3 text-white transition hover:bg-blue-400 font-medium"
            >
              Sign In
            </button>

            {error && (
              <p className="mt-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-center text-red-500 text-sm">
                {error}
              </p>
            )}
          </form>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:grid-cols-4">
          <div>
            <h3 className="text-2xl font-semibold">BudgetNest</h3>
            <p className="mt-4 text-sm leading-6 text-gray-400">
              Take control of your money. Track, save &amp; grow — all in one
              place.
            </p>
          </div>

          <div>
            <h4 className="text-base font-semibold">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li>Home</li>
              <li>How It Works</li>
              <li>Features</li>
              <li>About</li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-semibold">Support</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li>Contact Us</li>
              <li>FAQ</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-semibold">Follow Us</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
              <li>LinkedIn</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 px-6 py-4 text-center text-sm text-gray-400">
          © 2024 BudgetNest. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default LoginForm;
