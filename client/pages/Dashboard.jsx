import React, { useState, useEffect } from "react";
import Navbar from "../src/components/Navbar.jsx";
import Herosection from "../src/components/Herosection.jsx";
import { getFiles } from "../src/services/fileService.js";
const Dashboard = () => {
  const [Data, SetData] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // Toggle between grid & list

  useEffect(() => {
    (async () => {
      const data = await getFiles();
      if (!data) {
        console.log("Loading...");
      }
      SetData(data.projects);
    })();
  }, [Data]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold text-gray-800">Projects</h1>
          <div>
            <button
              className={`px-4 py-2 mx-1 rounded ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
              onClick={() => setViewMode("grid")}
            >
              Grid
            </button>
            <button
              className={`px-4 py-2 mx-1 rounded ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
              onClick={() => setViewMode("list")}
            >
              List
            </button>
          </div>
        </div>
        <Herosection data={Data} viewMode={viewMode} />
      </div>
    </div>
  );
};

export default Dashboard;
