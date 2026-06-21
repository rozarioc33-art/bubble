import { createContext, useContext, useEffect, useState } from "react";
import API from "@/services/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const register = async (name, email, password) => {
    const { data } = await API.post("/auth/register", {
      name,
      email,
      password,
    });

    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", data.token);
    setCurrentUser(data);
  };

  const login = async (email, password) => {
    const { data } = await API.post("/auth/login", { email, password });
    // Data contains { _id, name, email, token }
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", data.token); // Store token for the API interceptor
    setCurrentUser(data);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, login, register, logout, loading }}
    >
      {!loading && children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
