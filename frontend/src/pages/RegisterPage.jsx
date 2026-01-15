import React from "react";

const RegisterPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

        <input
          type="text"
          placeholder="Username"
          className="w-64 p-3 border rounded-md mb-4 block"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-64 p-3 border rounded-md mb-4 block"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-64 p-3 border rounded-md mb-4 block"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-64 p-3 border rounded-md mb-4 block"
        />

        <button className="w-64 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          Sign Up
        </button>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
