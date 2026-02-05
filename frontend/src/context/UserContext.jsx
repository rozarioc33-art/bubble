// src/context/UserContext.jsx
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    id: "me",
    name: "Taylor",
    status: "Explorer 🧭",
    avatarUrl: "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_26.png",
  });

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
