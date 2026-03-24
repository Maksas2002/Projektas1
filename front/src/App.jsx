import { Link, Routes, Route} from "react-router";
import Home from "./compoments/Home";
import LoginForm from "./compoments/LoginForm";
import SignupForm from "./compoments/SignupForm";

function App() {

  return (
    <>
      <div className="flex justify-between m-3">
        <h3 className="text-xl text-blue-500">BudgetNest</h3>

        <Link to="/">Home</Link>

        <Link to="login" className="border p-3">Sign in</Link>
      </div>
      <div>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/signup" element={<SignupForm/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
