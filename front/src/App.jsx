import { Routes, Route } from "react-router"; // Ištrink BrowserRouter iš čia
import LoginForm from "./LoginForm/LoginForm";
import AdminPage from "./pages/AdminPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
  );
}

export default App;