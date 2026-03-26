import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import errorHandler from "../utils/errorHandler";

function SignUpForm() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setError(null);
      setSuccess(null);

      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        data,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      setSuccess("Account created successfully");
      reset();

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      setError(errorHandler(error));
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
              Create Account
            </h1>
            <p className="mt-2 text-center text-[1rem] text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400">
                Sign In
              </Link>
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center gap-4 pt-10"
          >
            <div>
              <label className="mb-2 block text-white">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                {...register("name", {
                  required: true,
                  minLength: 2,
                  maxLength: 100,
                })}
                className="block h-12 w-full rounded-[10px] border border-white/10 bg-[#1f2747] px-3 text-gray-300 outline-none placeholder:text-gray-500"
              />
              {errors.name && (
                <span className="mt-2 block text-sm text-red-500">
                  Name is required and must be from 2 to 100 characters long
                </span>
              )}
            </div>

            <div>
              <label className="mb-2 block text-white">Email</label>
              <input
                type="text"
                placeholder="john@example.com"
                {...register("email", {
                  required: true,
                  minLength: 5,
                  maxLength: 150,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
                className="block h-12 w-full rounded-[10px] border border-white/10 bg-[#1f2747] px-3 text-gray-300 outline-none placeholder:text-gray-500"
              />
              {errors.email && (
                <span className="mt-2 block text-sm text-red-500">
                  Email is required and must be valid
                </span>
              )}
            </div>

            <div>
              <label className="mb-2 block text-white">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                {...register("password", {
                  required: true,
                  minLength: 3,
                  maxLength: 100,
                })}
                className="block h-12 w-full rounded-[10px] border border-white/10 bg-[#1f2747] px-3 text-gray-300 outline-none placeholder:text-gray-500"
              />
              {errors.password && (
                <span className="mt-2 block text-sm text-red-500">
                  Password is required and must be from 3 to 100 characters long
                </span>
              )}
            </div>

            <input
              type="submit"
              value="Create Account"
              className="mt-2 cursor-pointer rounded-[10px] bg-blue-500 p-3 text-white transition hover:bg-blue-400"
            />

            {error && <p className="text-center text-red-500">{error}</p>}
            {success && <p className="text-center text-green-500">{success}</p>}
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

export default SignUpForm;