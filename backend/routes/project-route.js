const express = require("express");
const router = express.Router();

const projectByUserId = require('../controllers/projects/affichage/projectByUser')
const projectById = require('../controllers/projects/affichage/projectById')
const tasksByProject = require('../controllers/projects/affichage/tasksByProject')
const updateProject = require('../controllers/projects/modification/updateProject')
const deleteProject = require('../controllers/projects/suppression/deleteProject')
const createNewProject = require('../controllers/projects/creation/createProject')

router.get("/user/:pid", projectByUserId.getProjectByUser);
router.get("/:pid", projectById.getProjectById);
router.get("/tasks/:pid", tasksByProject.getTasksByProject);

router.patch("/validation/:pid", updateProject.validateProject);
router.patch("/modification/:pid", updateProject.updateProject);
router.patch("/modification/content/:pid", updateProject.updateProjectContent);


router.post("/create", createNewProject.createNewProject);
router.delete("/:pid", deleteProject.deleteProject);


module.exports = router;