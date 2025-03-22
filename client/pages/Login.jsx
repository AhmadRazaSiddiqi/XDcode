import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../src/services/AuthService.js";
import { useLoggedIn } from "../src/Hooks/LoggedinContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { login: loginContext } = useLoggedIn();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await login(userData);
      if(res?.success) {
        loginContext(res.success.token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        className="bg-white shadow-lg rounded-lg p-8 w-96"
        method="POST"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-3xl font-semibold text-gray-800 mb-4">
          Login
        </h1>

        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400 mt-1 mb-4"
          placeholder="Enter your email"
          required
          onChange={handleData}
        />

        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400 mt-1 mb-6"
          placeholder="Enter your password"
          required
          onChange={handleData}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition"
        >
          Login
        </button>

        <p className="text-center text-gray-600 text-sm mt-4">
          Don't have an account?{" "}
          <NavLink to={"/register"} className="text-blue-500 font-semibold hover:underline">
            Register
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Login;
