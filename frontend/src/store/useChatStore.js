import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: localStorage.getItem("isSoundEnabled") === "true",

    toggleSound: async () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled)
        set({ isSoundEnabled: !get().isSoundEnabled })
    },

    setActiveTab: (tab) => set({ activeTab: tab }),
    setSelectedUser: (selectedUser) => set({ selectedUser }),

    getAllContacts: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/message/contacts");
            set({ allContacts: res.data.filteredUsers });
        } catch (error) {
            toast.error(error.response?.data?.message || "Network Error: Is the backend running?");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getConversations: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/message/chats");
            set({ chats: res.data.chatPartners });
        } catch (error) {
            toast.error(error.response?.data?.message || "Network Error: Is the backend running?");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessagesByUserId: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/message/${userId}`);
            set({ messages: res.data.messages });
        } catch (error) {
            toast.error(error.response?.data?.message || "Network Error: Is the backend running?");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async messageData => {
        const { messages, selectedUser } = get();
        const { authUser } = useAuthStore.getState();

        const tempId = `temp-${Date.now()}`;

        const optimisticMessage = {
            _id: tempId,
            senderId: authUser._id,
            receiverId: selectedUser._id,
            text: messageData.text,
            image: messageData.image,
            createdAt: new Date().toISOString(),
            isOptimistic: true
        };

        set({ messages: [...messages, optimisticMessage] });

        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
            console.log("BACKEND RESPONSE:", res.data.newMessage);
            set({
                messages: get().messages.map((msg) =>
                    msg._id === tempId ? res.data.newMessage : msg
                )
            });
        } catch (error) {
            set({ messages: get().messages.filter((msg) => msg._id !== tempId) });
            toast.error(error.response?.data?.message || "Something Went Wrong")
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", newMessage => {
            const currentSelectedUser = get().selectedUser;

            if (newMessage.senderId !== currentSelectedUser._id) {
                return;
            }

            const currentMessages = get().messages;
            set({ messages: [...currentMessages, newMessage] });

            const lastestIsSoundEnabled = get().isSoundEnabled

            if (lastestIsSoundEnabled) {
                const notificationSound = new Audio("/sounds/notification.mp3");

                notificationSound.currentTime = 0;
                notificationSound.volume = 0.6;
                notificationSound.play().catch((e) => console.log("Audio play failed:", e));
            }
        })
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

}));