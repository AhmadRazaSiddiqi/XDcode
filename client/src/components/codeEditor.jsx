import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { updateFiles } from "../services/fileService.js"; 

const CodeEditor = ({ file }) => {
  if (!file) return <div className="flex items-center justify-center h-screen text-gray-700">Loading...</div>;

  const { _id, javascript, html, css } = file;
  const [data, setData] = useState({ javascript, html, css });
  const [activeTab, setActiveTab] = useState("html");

  // Generate iframe output
  const generateSrcDoc = () => `
    <html>
      <head>
        <style>${data.css}</style>
      </head>
      <body>
        ${data.html}
        <script>${data.javascript}<\/script>
      </body>
    </html>
  `;

  // Handle tab switching
  const handleTabs = (tab) => {
    setActiveTab(tab.toLowerCase());
  };

  // Save file via API
  const saveFile = async () => {
    try {
      await updateFiles(_id, data);
      alert("File saved successfully!");
    } catch (error) {
      console.error("Error saving file:", error);
      alert("Failed to save file.");
    }
  };

  // Handle saving file on Ctrl + S
  useEffect(() => {
    const handleKeyDown = async (event) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        await saveFile();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [data]);

  return (
    <div className="grid grid-cols-2 h-screen w-screen overflow-hidden">

      {/* Left Side: Code Editor */}
      <div className="flex flex-col bg-white shadow-md border-r border-gray-300">
        {/* Top Bar with Save Button */}
        <div className="flex justify-between items-center bg-gray-200 p-3">
          <div className="flex space-x-4 text-gray-800">
            <button 
              onClick={() => handleTabs("html")} 
              className={`px-4 py-2 rounded ${activeTab === "html" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
            >
              HTML
            </button>
            <button 
              onClick={() => handleTabs("css")} 
              className={`px-4 py-2 rounded ${activeTab === "css" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
            >
              CSS
            </button>
            <button 
              onClick={() => handleTabs("javascript")} 
              className={`px-4 py-2 rounded ${activeTab === "javascript" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
            >
              JavaScript
            </button>
          </div>
          <button 
            onClick={saveFile} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Save
          </button>
        </div>

        <Editor
          height="100%"
          theme="light"
          language={activeTab}
          value={data[activeTab]}
          options={{ minimap: { enabled: false } }} // Disable minimap
          onChange={(newValue) => setData((prev) => ({ ...prev, [activeTab]: newValue }))}
        />
      </div>

      {/* Right Side: Live Preview */}
      <div className="p-4 bg-gray-100 flex flex-col items-center justify-center shadow-md">
        <h3 className="text-lg font-bold mb-2 text-gray-800">Live Preview</h3>
        <iframe
          title="output"
          className="w-full h-full border border-gray-300 rounded-lg bg-white shadow-md"
          srcDoc={generateSrcDoc()}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
};

export default CodeEditor;
