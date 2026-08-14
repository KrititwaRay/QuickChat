import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { getMessages, getUserForSideBar, markMessageAsSeen } from "../controllers/messageController.js";

const messageRoute = express.Router();


messageRoute.get('/user',protectRoute, getUserForSideBar)
messageRoute.get('/:id',protectRoute, getMessages)
messageRoute.get('/amrk/:id',protectRoute, markMessageAsSeen)

export default messageRoute;    