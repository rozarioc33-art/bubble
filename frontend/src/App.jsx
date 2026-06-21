import React, { useState } from "react";
import {
  Routes,
  Route,
  Outlet,
  useParams,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LobbyPage from "./pages/LobbyPage";
import ChatRoom from "./pages/ChatRoom";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import EmptyChat from "./pages/EmptyChat";

import { useUser } from "./context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useUser();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

const ChatLayout = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isDesktop && location.state?.openProfile) {
      setIsProfileOpen(true);

      // clear state so it doesn't reopen on refresh
      navigate(location.pathname, {
        replace: true,
        state: {},
      });
    }

    // close profile panel if switching to mobile
    if (!isDesktop) {
      setIsProfileOpen(false);
    }
  }, [isDesktop, location.state, navigate, location.pathname]);

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
        <div className="basis-1/4 max-w-[320px] min-w-[260px] border-l overflow-y-auto">
          <ProfilePage onClose={() => setIsProfileOpen(false)} />
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<EmptyChat />} />
        <Route path=":id" element={<ChatRoom />} />
      </Route>

      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
