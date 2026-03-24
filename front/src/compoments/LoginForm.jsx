import { Link } from "react-router";

function LoginForm() {
    return(
        <>
        <h1 className="text-3xl text-center text-purple-800 py-3">Login</h1>
        <p className="text-center">Don't have account? <Link to="/signup" className="text-blue-500">Sign up</Link></p>
        </>
    )
}

export default LoginForm;