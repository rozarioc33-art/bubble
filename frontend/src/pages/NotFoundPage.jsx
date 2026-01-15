import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">Page not found</p>
      <a
        href="/"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Back to Home
      </a>
    </div>
  );
};

export default NotFoundPage;
