import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useParams,
} from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LobbyPage from "./pages/LobbyPage";
import ChatRoom from "./pages/ChatRoom";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import EmptyChat from "./pages/EmptyChat";

const ChatLayout = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const { id } = useParams();

  return (
    <div className="h-[100dvh] w-full flex overflow-hidden">
      {/* Lobby */}
      {(isDesktop || !id) && (
        <div className="w-full md:basis-1/3 md:shrink-0 border-r overflow-y-auto min-w-0">
          <LobbyPage onOpenProfile={() => setIsProfileOpen(true)} />
        </div>
      )}

      {/* Chat */}
      {(isDesktop || id) && (
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <Outlet />
        </div>
      )}

      {/* Profile panel (desktop only) */}
      {isDesktop && isProfileOpen && (
        <div className="w-[320px] border-l overflow-y-auto">
          <ProfilePage onClose={() => setIsProfileOpen(false)} />
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/chat" element={<ChatLayout />}>
          <Route index element={<EmptyChat />} />
          <Route path=":id" element={<ChatRoom />} />
        </Route>

        <Route path="/profile" element={<ProfilePage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
