import express from "express"
import { createUserController, deleteUserController, listUsersController, updateUserController } from "../controllers/userController.js"

const router=express.Router();

router.post('/',createUserController);
router.put('/',updateUserController);
router.delete("/",deleteUserController);
router.get("/",listUsersController);
export default router;