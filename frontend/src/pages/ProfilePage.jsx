import React, { useState } from "react";
import { PencilIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const ProfilePage = ({ onClose }) => {
  const { currentUser, setCurrentUser } = useUser();
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();
  const isDesktop = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    if (isDesktop && !onClose) {
      navigate("/chat", {
        replace: true,
        state: { openProfile: true },
      });
    }
  }, [isDesktop, navigate, onClose]);

  return (
    <div className="h-full w-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b">
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
        )}
        <h2 className="font-semibold text-lg">Profile</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            {currentUser?.avatarUrl && !imgError ? (
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                onError={() => setImgError(true)}
                className="w-28 h-28 rounded-full object-cover"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 flex items-center justify-center text-white text-4xl font-semibold">
                {currentUser?.name?.charAt(0).toUpperCase()}
              </div>
            )}

            <button className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow">
              <PencilIcon className="w-4 h-4 text-slate-600" />
            </button>
          </div>

          <h3 className="mt-4 text-xl font-semibold text-slate-900">
            {currentUser.name}
          </h3>
          <p className="text-sm text-slate-500">
            {currentUser.status || "Available"}
          </p>
        </div>

        {/* Info Section */}
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Display name
            </label>
            <input
              value={currentUser.name}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, name: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-slate-100
              focus:outline-none focus:ring-2 focus:ring-violet-300"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Status
            </label>
            <input
              value={currentUser.status}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, status: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-slate-100
              focus:outline-none focus:ring-2 focus:ring-violet-300"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 space-y-4">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-gradient-to-br from-violet-400 to-pink-400 text-white"
          >
            Save changes
          </button>

          <button className="w-full py-3 rounded-xl text-red-500 hover:bg-red-50">
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
