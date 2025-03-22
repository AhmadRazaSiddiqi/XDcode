import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoggedIn } from '../Hooks/LoggedinContext';

const Navbar = () => {
  const { logout } = useLoggedIn();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-100 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-gray-800">
          <img src="/XDCode.svg" alt="Logo" className="w-16" />
        </NavLink>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
