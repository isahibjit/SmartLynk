import React, { useEffect, useRef, useState } from "react";
import ChatSidebar from "../Components/ChatSidebar";
import ChatWindow from "../Components/ChatWindow";
import ChatBox from "./ChatBox.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getUsersForSidebar } from "../features/chat/chatSlice.js";
import toast from "react-hot-toast";
import SidebarSkeleton from "../Components/Skeletons/SidebarSkeleton.jsx";
const ChatApp = () => {
  const [activeChat, setActiveChat] = useState(null);
  const { users, selectedUser, isSelectedForMobile } = useSelector(
    (state) => state.chat
  );
  const homePageRef = useRef();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersForSidebar());
  }, [dispatch]);
  const { isUserLoading } = useSelector((state) => state.chat);
  return (
    <div
      ref={homePageRef}
      className="relative flex h-screen size-full border  py-15  flex-row group/design-root "
      style={{ fontFamily: "Inter, 'Noto Sans', sans-serif" }}
    >
      <main className="flex-1 flex flex-row bg-white  w-full">
        {isUserLoading ? (
          <SidebarSkeleton />
        ) : (
          <ChatSidebar
            contacts={users}
            activeChat={activeChat}
            onContactClick={setActiveChat}
          />
        )}

        {selectedUser ? <ChatBox /> : <ChatWindow />}
      </main>
    </div>
  );
};

export default ChatApp;
