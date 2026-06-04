import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import { getAllContacts,getMessagesByUserId,sendMessage,getConversations} from "../controllers/message.controller.js";

const router = express.Router();
router.use(arcjetProtection,protectRoute);


router.get("/contacts",getAllContacts);
router.get("/chats",getConversations);
router.get("/:id",getMessagesByUserId);
router.post("/send/:id",sendMessage);


export default router;