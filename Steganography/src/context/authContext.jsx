

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(); 

export const useAuth = () => useContext(AuthContext); 

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const role = JSON.parse(localStorage.getItem("role") || "[]");

    if (token) {
      setUser({ email, role });
    }
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("email", data.email);
    localStorage.setItem("role", JSON.stringify(data.role || []));

    setUser({ email: data.email, role: data.role || [] });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}