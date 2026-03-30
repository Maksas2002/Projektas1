import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Nepavyko nuskaityti vartotojo duomenų:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  
  const login = (userData) => {
   
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Funkcija atsijungimui
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isAdmin = user?.role === "Admin";

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, isAdmin, loading }}>
      {children}
    </UserContext.Provider>
  );
};