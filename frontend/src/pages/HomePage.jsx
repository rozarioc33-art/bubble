import React from "react";

const HomePage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Bubble</h1>
        <a
          href="/login"
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Enter Chat
        </a>
      </div>
    </div>
  );
};

export default HomePage;
