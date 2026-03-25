import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { handleErrors } from "../utils/errorhandling.js";

const API_URL = import.meta.env.VITE_API_URL;

function LoginForm() {
    const [error, setError] = useState("");
    const {setUser} = useContext(UserContext);
    const {register, handleSubmit, formState:{errors}} = useForm();
    const navigate = useNavigate();

    const onSubmit = async (formdata) =>{
        try {
            const response = await axios.post(`${API_URL}/users/login`, formdata, {withCredentials:true});

            setUser(response.data.data);
            navigate("/dashboard");
        } catch (error) {
            setError(handleErrors(error));
        }
    }
    return(
        <>
            <div className="min-h-screen flex flex-col justify-center text-center items-center">
                <form onSubmit={handleSubmit(onSubmit)} className="text-xl text-white p-2">
                    <h3 className="m-2 text-4xl font-bold">Welcome back</h3>
                    <div className="p-2">
                        <p>
                            I dont have account <Link to="/signup" className="text-blue-400 hover:text-blue-500">Sign up</Link>
                        </p>
                    </div>
                    <div className="p-2 text-start">
                        <label>Email: </label>
                        <input
                        id="email"
                        name="email"
                        type="email"
                        className="my-3 p-3 w-full bg-gray-700"
                        {...register("email")}
                        placeholder="name@example.com"
                        required
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="p-2 text-start">
                        <label>Password:</label>
                        <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        className="my-3 p-3 w-full bg-gray-700"
                        {...register("password")}
                        required
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>
                    <button className="w-full p-3 bg-blue-400 hover:bg-blue-500 font-bold" type="submit">Login</button>
                                    
                    <div className="text-red-800">{error}</div>
                </form>
            </div>
        </>
    );
}

export default LoginForm;

    
