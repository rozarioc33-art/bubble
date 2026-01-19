// src/context/UserContext.jsx
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    id: "me",
    name: "Taylor",
    status: "Explorer 🧭",
    avatarUrl: "https://images.unsplash.com/photo-1699524826369-57870e627c43", // no backend yet
  });

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
