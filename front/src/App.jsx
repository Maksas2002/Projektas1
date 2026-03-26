import {Routes, Route} from "react-router";
import Home from "./compoments/Home";
import LoginForm from "./compoments/LoginForm";
import SignupForm from "./compoments/SignupForm";
import Dashboard from "./compoments/Dashboard";
import Header from "./compoments/Header";
import ProtectedRoute from "./compoments/ProtectedRoute.jsx";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext.jsx";
import Footer from "./compoments/Footer.jsx";

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="flex justify-between m-3 text-white">
        <Header/>
      </div>
      <div>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/signup" element={<SignupForm/>}/>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        </Routes>
      </div>

      {!user&& <div>
          <Footer/>
      </div>}
    </>
  )
}

export default App
