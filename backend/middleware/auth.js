
import User from "../models/user.js";
import jwt from "jsonwebtoken"
// Middleare to protect route



export const protectRoute = async (req, res, next) => {
    try {

        const token = req.headers.authorization?.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select('-password');
        console.log("user ", user)

        if (!user) {
            return res.json({
                success: false,
                message: "User not found."
            })
        }

        req.user = user

        next();
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: error.message
        })
    }
}