import User from "../models/User.js";
import Message from "../models/Message.js";
import cloudinary from "../lib/cloudinary.js";
import { io } from "../lib/socket.js";
import { getReceiverSocketId } from "../lib/socket.js";

export const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json({ filteredUsers });
    } catch (error) {
        console.log("Error in message getAllContacts Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const { id: chatPartnerId } = req.params;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: chatPartnerId },
                { senderId: chatPartnerId, receiverId: myId }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json({ messages });

    } catch (error) {
        console.log("Error in message getMessagesById Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        if (!text && !image) {
            return res.status(400).json({ message: "You must provide either text or an image." });
        }

        if (senderId.equals(receiverId)) {
            return res.status(400).json({ message: "Cannot send messages to yourself." });
        }

        const receiverExists = await User.exists({ _id: receiverId });
        if (!receiverExists) {
            return res.status(404).json({ message: "Receiver not found." });
        }

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId, receiverId, text, image: imageUrl
        });
        await (newMessage.save());

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json({ newMessage });
    } catch (error) {
        console.log("Error in message sendMessage Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getConversations = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: loggedInUserId },
                { receiverId: loggedInUserId }
            ]
        })

        const chatPartnersIds = [...new Set(
            messages.map(msg => {
                return msg.senderId.toString() === loggedInUserId.toString() ? msg.receiverId.toString() : msg.senderId.toString()
            })
        )
        ];

        const chatPartners = await User.find({ _id: { $in: chatPartnersIds } }).select("-password");
        res.status(200).json({ chatPartners });
    } catch (error) {
        console.log("Error in message getConversations Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
