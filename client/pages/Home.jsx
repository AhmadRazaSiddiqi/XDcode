import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to XD Code</h1>
      <p className="text-lg text-gray-600 max-w-2xl text-center mb-6">
      Experience the future of coding with XD Code, a modern and efficient
        code editor designed for developers of all levels. Code faster,
        collaborate better, and build amazing projects with support for HTML,
        CSS, and JavaScript.
      </p>
      <div className="flex space-x-4">
        <NavLink
          to="/login"
          className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
        >
          Login
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
