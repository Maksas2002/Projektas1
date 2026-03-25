import { Routes, Route } from "react-router";
import LoginForm from "./LoginForm/LoginForm";

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
