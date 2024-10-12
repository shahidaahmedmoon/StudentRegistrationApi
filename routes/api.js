import express from "express";
const router = express.Router();

import * as FilesController from "../app/controllers/FilesController.js";
import * as StudentsController from "../app/controllers/StudentsController.js";
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";






// Students
router.post("/Registration", StudentsController.Registration)
router.post("/Login", StudentsController.Login)
router.get("/ReadProfile",AuthMiddleware, StudentsController.ReadProfile)
router.post("/UpdateProfile",AuthMiddleware, StudentsController.UpdateProfile)






// Files
router.post("/UploadFile",FilesController.UploadFile)
router.get("/ReadFile/:filename",FilesController.ReadFile)
router.get("/DeleteFile/:filename",FilesController.DeleteFile)


export default router;
