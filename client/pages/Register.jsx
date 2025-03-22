import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { register } from "../src/services/AuthService.js";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const res = await register(userData);
      if (res?.success) {
        setUserData({ userName: "", email: "", password: "" }); // Reset the form
        navigate("/login");
      }
    } catch (error) {
      console.log("Something Went Wrong");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        className="bg-white shadow-lg rounded-lg p-8 w-96"
        onSubmit={registerUser}
        method="POST"
      >
        <h1 className="text-center text-3xl font-semibold text-gray-800 mb-4">
          Register
        </h1>

        <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
          User Name
        </label>
        <input
          type="text"
          name="userName"
          value={userData.userName}  // Controlled Input
          className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400 mt-1 mb-4"
          placeholder="Enter your name"
          required
          onChange={handleData}
        />

        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={userData.email}  // Controlled Input
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
          value={userData.password}  // Controlled Input
          className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400 mt-1 mb-6"
          placeholder="Enter your password"
          required
          onChange={handleData}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition"
        >
          Register
        </button>

        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <NavLink to={"/login"} className="text-blue-500 font-semibold hover:underline">
            Login
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Register;
