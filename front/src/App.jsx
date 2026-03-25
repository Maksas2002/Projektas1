import {Routes, Route} from "react-router";
import Home from "./compoments/Home";
import LoginForm from "./compoments/LoginForm";
import SignupForm from "./compoments/SignupForm";
import Dashboard from "./compoments/Dashboard";
import Header from "./compoments/Header";

function App() {

  return (
    <>
      <div className="flex justify-between m-3">
        <Header/>
      </div>
      <div>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/signup" element={<SignupForm/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
