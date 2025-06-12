import React, { useState } from 'react';
import ChatSidebar from "../Components/ChatSidebar"
import ChatWindow from "../Components/ChatWindow"
import { contactData } from '../Components/ContactItem';




const ChatApp = () => {
  const [activeChat, setActiveChat] = useState(0); // Set Sarah as the default active chat
  
  return (
    <div className="relative flex size-full min-h-screen flex-row group/design-root " style={{ fontFamily: "Inter, 'Noto Sans', sans-serif" }}>
      <main className="flex-1 flex flex-row bg-white">
        <ChatSidebar contacts={contactData} activeChat={activeChat} onContactClick={setActiveChat} />
        <ChatWindow />
      </main>
    </div>
  );
};

export default ChatApp;