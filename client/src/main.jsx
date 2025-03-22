import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../pages/Login.jsx"
import Register from "../pages/Register.jsx"
import Editor from "../pages/Editor.jsx"
import Dashboard from "../pages/Dashboard.jsx"
import Project from "../pages/Project.jsx"
import { LoggedInProvider } from "./Hooks/LoggedinContext.jsx"
import ProtectedRoute from "../pages/ProtectedRoute.jsx"

createRoot(document.getElementById("root")).render(
  <LoggedInProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />}/>} />
        <Route path="/editor/projects/:projectid" element={<ProtectedRoute element={<Editor />}/>} />
      </Routes>
    </BrowserRouter>
  </LoggedInProvider>
)
