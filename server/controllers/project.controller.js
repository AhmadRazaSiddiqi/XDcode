import { projectModel } from "../models/project.model.js"

// create projects
export const createProject = async function (req, res) {
  try {
    const { projectName } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ err: "Unauthorized: Missing user ID" });
    }

    // Check if a project with the same name exists for the same user
    const existingProject = await projectModel.findOne({
      projectName,
      createdBy: req.user.id,  // Ensures it's the same user
    });

    if (existingProject) {
      return res.status(409).json({
        err: "Project with this name already exists for this user",
        projectName,
      });
    }

    // If no duplicate project exists for the user, create a new one
    const createdProject = await projectModel.create({
      projectName,
      createdBy: req.user.id,
    });

    res.status(201).json({ msg: "Project Created Successfully", createdProject });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ err: "Internal Server Error", details: error.message });
  }
};

// get All projects
export const getProjects = async (req, res) => {
  const { id } = req.user
  try {
    const projects = await projectModel.find({ createdBy: id })
    if (!projects) {
      res.status(404).json({ msg: "No projects Found" })
    }
    res.status(200).json({ projects })
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" })
  }
}
// Get Single project
export const getProject = async (req, res) => {
  const { id } = req.params
  try {
    const project = await projectModel.findOne({ _id: id })
    if (!project) {
      res.status(404).json({ err: "project Not Found" })
    }
    res.status(200).json({ project })
  } catch (error) {
    res.status(500).json({ err: "Internal Server Error" })
  }
}

// Delete projects
export const deleteProject = async (req, res) => {
  const { id } = req.params
  try {
    const deletedProject = await projectModel.findOneAndDelete({ _id: id })
    if (!deletedProject) {
      res.status(404).json({ msg: "project not found" })
    }
    res.status(200).json({ deletedProject })
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" })
  }
}

// update projects
export const updateProject = async (req, res) => {
  const { id } = req.params
  try {
    const UpdatedProject = await projectModel.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    )
    if (!UpdatedProject) {
      res.status(404).json({ msg: "project Not Found" })
    }
    res.status(200).json({ msg: "project updated Successfuly" })
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" })
  }
}
