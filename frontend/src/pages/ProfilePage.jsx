import React from "react";

const ProfilePage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto p-6">
        {/* Avatar Placeholder */}
        <div className="w-24 h-24 rounded-full bg-gray-200 mb-6 mx-auto flex items-center justify-center">
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>

        {/* Display Name Input */}
        <input
          type="text"
          placeholder="Display Name"
          defaultValue="John Doe"
          className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Status Input */}
        <input
          type="text"
          placeholder="Status"
          defaultValue="Available"
          className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Save Button */}
        <button className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors mb-6">
          Save
        </button>

        {/* Log Out Link */}
        <div className="text-center text-sm text-gray-600">
          <a href="/login" className="hover:text-gray-800 transition-colors">
            Log out
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
