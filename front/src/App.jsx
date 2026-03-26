import { Routes, Route } from "react-router"; // Ištrink BrowserRouter iš čia
import LoginForm from "./LoginForm/LoginForm";
import AdminPage from "./pages/AdminPage";
import SignUpForm from "./components/SignUpForm";
import ProtectedRoute from "./utlis/ProtectedRoute";
import DashBoard from "./DashBoard"

function App() {
  return (
      <Routes>

        {/* <Route path="/" element={<LoginForm />} /> */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<div>404 - Not Found</div>} />
       <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute>
            <DashBoard/>
          </ProtectedRoute>
        }
      />
   </Routes>
  );
}

export default App;