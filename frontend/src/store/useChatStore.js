import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

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
            set({ messages: res.data.messages});
        } catch (error) {
            toast.error(error.response?.data?.message || "Network Error: Is the backend running?");
        } finally {
            set({ isMessagesLoading: false });
        }
    }

}));