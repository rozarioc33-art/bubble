import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ChatProvider } from "./context/ChatContext";
import { UserProvider } from "./context/UserContext";

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <ChatProvider>
      <App />
    </ChatProvider>
  </UserProvider>,
);
