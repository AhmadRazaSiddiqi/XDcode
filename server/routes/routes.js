import { Router } from "express"
import { login, register } from "../controllers/auth.controller.js"
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "../controllers/project.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

export const route = Router()

route.post("/register", register)
route.post("/login", login)
route.post("/create", authMiddleware, createProject)
route.get("/get", authMiddleware, getProjects)
route.delete("/delete/:id", authMiddleware, deleteProject)
route.patch("/update/:id", authMiddleware, updateProject)
route.get("/get/:id", authMiddleware, getProject)
