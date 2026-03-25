import { useState } from "react";
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router";
import { handleErrors } from "../utils/errorhandling";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function SignupForm(){
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({defaultValues:{name:"", email:"", password:""}});

    const onSubmit = async (formValues) => {
        try {
            await axios.post(`${API_URL}/users/signup`, {
                name:formValues.name,
                email:formValues.email,
                password:formValues.password
            })

            alert("Succesfully regestered");
            reset();
            navigate("/login");
        } catch (error) {
            setError(handleErrors(error));
        }
    }


    return(
        <>
            <div className="min-h-screen flex flex-col justify-center text-center items-center">
                
                <form onSubmit={handleSubmit(onSubmit)} className="text-xl text-white p-2">
                    <h3 className="m-2 text-2xl font-bold">Sign up</h3>
                    <div className="p-2 text-start">
                        <label>Name:</label>
                        <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        className="p-3 my-3 w-full bg-gray-700"
                        {...register("name")}
                        required
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="p-2 text-start">
                        <label>Email:</label>
                        <input
                        id="email"
                        name="email"
                        type="email"
                        className="p-3 my-3 w-full bg-gray-700"
                        {...register("email")}
                        placeholder="john@example.com"
                        required
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.username.message}</p>
                        )}
                    </div>

                    <div className="p-2 text-start">
                        <label>Password:</label>
                        <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        className="p-3 my-3 w-full bg-gray-700"
                        {...register("password")}
                        required
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>

                    <button className="p-3 w-full bg-blue-400 hover:bg-blue-500 font-bold" type="submit">Create account</button>
                    <div className="p-2">
                        <p>
                            I already have my account. <Link to="/login" className="text-indigo-800 hover:text-indigo-900">Log in</Link>
                        </p>
                    </div>
                    <div className="text-red-800">{error}</div>
                </form>
            </div>
        </>
    )
}

export default SignupForm;