import React from "react";
import { deleteFiles } from "../src/services/fileService.js";
import { NavLink } from "react-router-dom";

const Project = ({ data }) => {
  if (!data || !data.projectName) {
    return <p className="text-center text-gray-500 text-lg">No projects created yet.</p>;
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteFiles(id);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition border border-gray-200">
      <NavLink to={`/editor/projects/${data._id}`} className="block">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{data.projectName}</h2>
      </NavLink>
      <button
        className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition w-[60%] block mx-auto"
        onClick={() => handleDelete(data._id)}
      >
        Delete
      </button>
    </div>
  );
};

export default Project;
