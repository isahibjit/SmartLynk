import React, { useEffect, useState } from "react";
import ContactItem from "./ContactItem";
import { useDispatch, useSelector } from "react-redux";
import {
  getConversations,
  setSelectedUser,
} from "../features/chat/chatSlice.js";
import toast from "react-hot-toast";
const ChatSidebar = ({ activeChat, onContactClick }) => {
  const { users, selectedUser, conversations, messages } = useSelector(
    (state) => state.chat
  );

  const { onlineUsers } = useSelector((state) => state.auth);

  const [isOnlineClicked, setIsOnlineClicked] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchConversation = async () => {
      try {
        await dispatch(getConversations()).unwrap();
      } catch (error) {
        toast.error("Couldn't fetch conversations");
      }
    };
    fetchConversation();
  }, [dispatch, messages]);

  return (
    <div
      className={`md:w-[30vw] w-full
    ${selectedUser && "hidden"}
    md:flex flex-col border-r border-base-300   overflow-y-auto`}
    >
      <div className="p-6 border-b border-base-300 shrink-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Contacts</h2>
          <div className="form-control">
            <label className="label cursor-pointer space-x-2">
              <span className="label-text text-sm">Show Online Only</span>
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-sm"
                onChange={()=>setIsOnlineClicked(!isOnlineClicked)}
              />
            </label>
          </div>
        </div>
        <div className="relative flex w-full items-center">
          <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-base-400">
            search
          </span>
          <input
            type="text"
            placeholder="Search contacts..."
            className="input input-bordered w-full h-12 pl-11 pr-4 text-sm"
          />
        </div>
      </div>
      <div className="overflow-y-auto flex-1">
        {(isOnlineClicked
          ? [...users].filter(user => onlineUsers.includes(user._id))
          : [...users])
              .sort((a, b) => {
                const aConv = conversations.find(
                  (conv) => conv.user._id === a._id
                );
                const bConv = conversations.find(
                  (conv) => conv.user._id === b._id
                );
                const aDate = aConv
                  ? new Date(aConv.lastMessage.createdAt)
                  : new Date(0);
                const bDate = bConv
                  ? new Date(bConv.lastMessage.createdAt)
                  : new Date(0);

                return bDate - aDate; // Newest conversation first
              })
              .map((contact) => {
                const conversation = conversations.find(
                  (conv) => conv.user._id === contact._id
                );

                return (
                  <ContactItem
                    key={contact._id}
                    contact={contact}
                    isActive={activeChat === contact._id}
                    isOnline={onlineUsers.includes(contact._id)}
                    lastMessage={
                      conversation?.lastMessage?.text || "No messages yet"
                    }
                    createdAt={conversation?.createdAt || null}
                    onClick={() => {
                      dispatch(setSelectedUser(contact));
                      onContactClick(contact._id);
                    }}
                  />
                );
              })}
      </div>
    </div>
  );
};
export default ChatSidebar;
