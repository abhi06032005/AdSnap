import { protect } from "../controllers/auth.js";
import express from "express";
import { getAllProjects, getProjectById, getUserCredits, toggleProjectPublish } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/credits" , protect, getUserCredits)
userRouter.get("/projects" , protect , getAllProjects)
userRouter.get("/projects/:projectId" , protect , getProjectById)
userRouter.post("/projects/:projectId/toggle-publish" , protect , toggleProjectPublish)

export default userRouter;