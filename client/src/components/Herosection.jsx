import React, { useState } from "react";
import Project from "../../pages/Project.jsx";
import { createFiles } from "../services/fileService.js";

const Herosection = ({ data = [], viewMode }) => {
  const [projectDetails, setProjectDetails] = useState({ projectName: "" });

  const handleSubmit = () => {
    if (!projectDetails.projectName.trim()) return alert("FileName Can't be Empty");
    createFiles(projectDetails);
  };

  return (
    <div>
      {/* Create Project Section */}
      <div className="bg-white p-4 shadow-md rounded-md flex items-center gap-3 mb-6">
        <input
          type="text"
          name="projectName"
          className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
          placeholder="Enter project name"
          onChange={(e) => setProjectDetails({ projectName: e.target.value })}
        />
        <button
          className="bg-blue-500 text-white !text-base px-2 py-2  rounded hover:bg-blue-600 transition"
          type="submit"
          onClick={handleSubmit}
        >
          +CreateProject
        </button>
      </div>

      {/* Project List */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Projects</h1>

      {Array.isArray(data) && data.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No projects created yet.</p>
      ) : (
        <div className={viewMode === "grid" ? "grid grid-cols-3 gap-6" : "flex flex-col space-y-4"}>
          {data.map((project, index) => (
            <Project key={index} data={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Herosection;
