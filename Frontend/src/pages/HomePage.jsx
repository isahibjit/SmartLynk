import React, { useEffect, useState } from "react";
import ChatSidebar from "../Components/ChatSidebar";
import ChatWindow from "../Components/ChatWindow";
import ChatBox from "./ChatBox.jsx"
import { useDispatch, useSelector } from "react-redux";
import { getUsersForSidebar } from "../features/chat/chatSlice.js";
import toast from "react-hot-toast";
const ChatApp = () => {
  const [activeChat, setActiveChat] = useState(null);
  const { users, selectedUser } = useSelector((state) => state.chat);
  console.log(users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersForSidebar());
  }, [getUsersForSidebar]);

  return (
    <div
      className="relative flex size-full min-h-[75vh]flex-row group/design-root "
      style={{ fontFamily: "Inter, 'Noto Sans', sans-serif" }}
    >
      <main className="flex-1 flex flex-row bg-white">
        <ChatSidebar
          contacts={users}
          activeChat={activeChat}
          onContactClick={setActiveChat}
        />
        {selectedUser ? <ChatBox /> : <ChatWindow />}
      </main>
    </div>
  );
};

export default ChatApp;
