import { Routes, Route } from "react-router";
import LoginForm from "./LoginForm/LoginForm";
import ProtectedRoute from "./utlis/ProtectedRoute";
import DashBoard from "./DashBoard"

function App() {
  

  return (
   <>
   <Routes>
    <Route path="/login" element={<LoginForm/>}/>
    <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute>
            <DashBoard/>
          </ProtectedRoute>
        }
      />
   </Routes>
   </>
  )
}

export default App
