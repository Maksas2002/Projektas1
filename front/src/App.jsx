import { Routes, Route } from "react-router";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignUpForm";

function App() {
  

  return (
   <>
   <Routes>

    <Route path="/login" element={<LoginForm/>}/>
   </Routes>
   </>
  )
}

export default App
