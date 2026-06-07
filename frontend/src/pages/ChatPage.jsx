import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js';

function ChatPage() {
    const {logout} = useAuthStore();

  return (
    <div class="z-10">
      <button className="btn">Chatpage</button>
      <button className="btn" onClick={logout}>Logout</button>
    </div>
  )
}
export default ChatPage;
