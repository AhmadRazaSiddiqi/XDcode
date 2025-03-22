import React, { useState, useEffect } from "react";
import CodeEditor from "../src/components/codeEditor.jsx";
import { getFile } from "../src/services/fileService.js";
import { useParams } from "react-router-dom";

const Editor = () => {
  const { projectid } = useParams();
  const [file, setFile] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getFile(projectid);
        if (!response || !response.project) {
          console.log("Loading...");
          return;
        }
        setFile(response.project);
      } catch (error) {
        console.log("Error fetching file:", error);
      }
    })();
  }, [projectid]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {file ? (
        <CodeEditor file={file} />
      ) : (
        <div className="text-gray-700 text-lg">Loading...</div>
      )}
    </div>
  );
};

export default Editor;
