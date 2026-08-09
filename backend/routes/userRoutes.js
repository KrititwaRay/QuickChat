import express from "express";
import { checkAuth, login, signup, updateProfile } from "../controllers/userController.js";
import { protectRoute } from "../middleware/auth.js";


const userRouter = express.Router();


userRouter.post('/singup', signup)
userRouter.post('/login', login)
userRouter.put('/update', protectRoute, updateProfile)
userRouter.put('/check', protectRoute, checkAuth)


export default userRouter;