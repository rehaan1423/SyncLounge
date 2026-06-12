import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import {connectDB} from "./lib/db.js";
import cors from "cors";
import { app,server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" }));
app.use(cors({origin:process.env.ClientUrl,credentials:true}));
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res) =>{
        res.sendFile(path.join(__dirname,"../frontend/dist/index.html"));
    });
}

server.listen(PORT,() =>{
    console.log("Server is Running 1235");
    connectDB();
})


