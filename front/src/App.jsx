import { Routes, Route } from "react-router";
import LoginForm from "./components/LoginForm";
import AdminPage from "./pages/AdminPage";
import SignUpForm from "./components/SignUpForm";
import ProtectedRoute from "./utlis/ProtectedRoute";
import DashBoard from "./pages/DashBoard";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Routes>
      {/* 1. PAGRINDINIS PUSLAPIS */}
      <Route path="/" element={<LandingPage />} />

      {/* 2. AUTENTIFIKACIJA */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />

      {/* 3. APSAUGOTAS ADMIN MARŠRUTAS */}
      <Route 
        path="/adminpage" 
        element={
          <ProtectedRoute requiredRole="Admin">
            <AdminPage />
          </ProtectedRoute>
        } 
      />

      {/* 4. APSAUGOTAS VARTOTOJO MARŠRUTAS */}
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