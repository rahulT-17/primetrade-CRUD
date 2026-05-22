import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const navigate = useNavigate();

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    setToken(res.data.access_token);
    localStorage.setItem("token", res.data.access_token);
    // Optionally fetch user info here if needed
    setUser({ email }); // Minimal, or fetch from /me endpoint if you have one
    localStorage.setItem("user", JSON.stringify({ email }));
    navigate("/dashboard");
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}