import http from 'http';
import {Server} from "socket.io";
import express from 'express';
import "dotenv/config";
import { socketAuthMiddleware } from '../middleware/socket.auth.middlware.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:process.env.ClientUrl,
        credentials:true
    }
})

io.use(socketAuthMiddleware);

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

const userSocketMap = {};

io.on("connection", (socket) =>{
    console.log("A User Connected",socket.user.fullName);

    const userId = socket.userId;
    userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    socket.on("disconnect", () =>{
        console.log("A User disConnected",socket.user.fullName);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
});

export {io,app,server};