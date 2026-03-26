import { Routes, Route } from "react-router";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";


function App() {
  

  return (
   <>
   <Routes>
    <Route path="/signup" element={<SignUpForm />} />
    <Route path="/login" element={<LoginForm/>}/>
   </Routes>
   </>
  )
}

export default App
