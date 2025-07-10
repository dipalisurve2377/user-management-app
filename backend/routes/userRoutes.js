import express from "express"
import { createUserController, deleteUserController, listUsersController, updateUserController } from "../controllers/userController.js"

const router=express.Router();

router.post('/create', createUserController);
router.put('/update', updateUserController);
router.delete('/delete', deleteUserController);
router.get('/get', listUsersController);


export default router;