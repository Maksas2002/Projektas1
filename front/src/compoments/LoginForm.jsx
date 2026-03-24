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
                <form onSubmit={handleSubmit(onSubmit)} className="border text-xl p-2">
                    <h3 className="m-2 text-2xl font-bold">Login</h3>
                    <div className="p-2">
                        <label>Email: </label>
                        <input
                        id="email"
                        name="email"
                        type="email"
                        className="m-2 p-2"
                        {...register("email")}
                        placeholder="name@example.com"
                        required
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="p-2">
                        <label>Password:</label>
                        <input
                        id="password"
                        name="password"
                        type="password"
                        className="m-2 p-2"
                        {...register("password")}
                        required
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>

                    <button className="p-3" type="submit">Login</button>
                    <div className="p-2">
                        <p>
                            I dont have account <Link to="/signup" className="text-indigo-800 hover:text-indigo-900">Sign up</Link>
                        </p>
                    </div>                
                    <div className="text-red-800">{error}</div>
                </form>
            </div>
        </>
    );
}

export default LoginForm;

    
