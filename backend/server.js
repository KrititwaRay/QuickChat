import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRoute from "./routes/messageRoutes.js";
import { Server } from "socket.io";


const app = express();

const server = http.createServer(app);

// Initialize socket.io server
export const io = new Server(server, {
    cors: { origin: '*' }
})

//Store online users

export const userSocketmap = {}; // { userId: socketId }

// Socket.io connection handler
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    console.log("User Connected",  userId)

    if(userId){
        userSocketmap[userId] = socket.id
    }

    // Emit online users to all connected clients
    io.emit("getOnlineusers", Object.keys(userSocketmap));

    socket.on("disconnect", () => {
        console.log("User Disconnected",  userId)
        delete userSocketmap[userId]
        io.emit("getOnlineusers", Object.keys(userSocketmap));
    })
})


//Middleware

app.use(express.json({limit: '4mb'}))
app.use(cors())

app.use("/api/status", (req, res) => res.send('Server is live'))

app.use('/api/auth', userRouter)
app.use('/api/messages', messageRoute)


await connectDB()
const PORT = process.env.PORT  || 5000;


server.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))