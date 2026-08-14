import User from "../models/user.js"
import Message from "../models/message.js"
import mongoose from "mongoose";
import cloudinary from "../lib/cloudinary.js"


// get all users except login user
export const getUserForSideBar = async (req, res) => {
    try {
        const userId = req.user._id;
        const filteredUser = await User.find({
            _id: { $ne: new mongoose.Types.ObjectId(userId) }
        }).select('-password');

        // Count number of message not seen
        const unseenMessage = {};

        const promises = filteredUser.map(async (user) => {
            const messages = await Message.find({
                senderId: new mongoose.Types.ObjectId(user._id),
                receiverId: new mongoose.Types.ObjectId(userId),
                seen: false
            })

            if (messages.length > 0) {
                unseenMessage[user._id] = messages.length
            }
        })

        await Promise.all(promises)

        return res.json({
            success: true,
            users: filteredUser,
            unseenMessage
        })


    } catch (error) {
        console.log(error.messages)

        return res.json({ success: false, message: error.message })
    }
}



// Get all messages for selected user
export const getMessages = async (req, res) => {
    try {

        const { id: selectedUserId } = req.params;

        const myId = req.user._id;


        const messages = await Message.find({
            $or: [
                {
                    senderId: mongoose.Types.ObjectId(myId),
                    receiverId: mongoose.Types.ObjectId(selectedUserId),

                },
                {
                    senderId: mongoose.Types.ObjectId(selectedUserId),
                    receiverId: mongoose.Types.ObjectId(myId),

                },
            ]
        })

        await Message.updateMany({
            senderId: mongoose.Types.ObjectId(selectedUserId),
            receiverId: mongoose.Types.ObjectId(myId),

        }, { seen: true })


        return res.json({ success: true, messages })

    } catch (error) {
        console.log(error.messages)

        return res.json({ success: false, message: error.message })
    }
}


// api to msrk message as seen using message id

export const markMessageAsSeen = async (req, res) => {
    try {
        const { id } = req.params;

        await Message.findByIdAndUpdate(id, {
            seen: true
        })

        return res.json({ success: true, })
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message })
    }
}


// Send message to selected user
export const sendMessage = async (req, res) => {
    try {
        const  { text, image } = req.body;
        const receiverId = req.params.id;
        const senderid = req.user._id;

        let imageUrl;

        if(image){
            const  uploadResonse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResonse.secure_url;
        }

        const newMessage = await Message.create({
            receiverId,
            senderid,
            text,
            image: imageUrl

        })

        return res.json({
            success: true,
            newMessage
        })

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message })
    }
}