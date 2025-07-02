import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import profileImg from "../assets/profile-holder.webp";
import { safeEmit } from "../lib/safeEmit.js";
import { FaArrowLeft } from "react-icons/fa";
import ChatForm from "../Components/Form.jsx";
import {
  setSelectedUser,
  getMessages,
  setTyping,
  setMessagesAsSeen,
} from "../features/chat/chatSlice";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import TimeFormat from "../lib/TimeFormat";
import { subscribeToMessage } from "../redux/socketActions";
import Typing from "../Components/Typing";
const ChatBox = () => {
  const { selectedUser, messages, typing } = useSelector((state) => state.chat);

  const messageEndRef = useRef(null);
  const { authUser, socket } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser?._id && socket && socket.connected) {
      socket.emit("join", authUser._id);
    }
  }, [authUser]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        await dispatch(getMessages(selectedUser._id)).unwrap();
      } catch (error) {
        toast.error("Fetch UnsuccessFul");
      }
    };
    fetchMessages();
    dispatch(subscribeToMessage());
  }, [selectedUser, subscribeToMessage, dispatch]);

  useEffect(() => {
    if (!selectedUser || !authUser || !messages.length) return;

    const lastMessage = messages[messages.length - 1];

    if (
      lastMessage.senderId === selectedUser._id &&
      lastMessage.receiverId === authUser._id &&
      !lastMessage.seen
    ) {
      safeEmit(socket, "markAsSeen", {
        senderId: selectedUser._id,
        receiverId: authUser._id,
      });

      dispatch(setMessagesAsSeen(selectedUser._id));
    }
  }, [messages]);

  useEffect(() => {
    if (!socket || !socket.connected || !selectedUser) return;

    
    socket.on("typing", ({ from }) => {
      if (from === selectedUser._id) {
        dispatch(setTyping(true));
      }
    });

    socket.on("stopTyping", ({ from }) => {
      if (from === selectedUser._id) {
        dispatch(setTyping(false));
      }
    });

    socket.on("messagesSeenByReceiver", ({ receiverId }) => {
      if (receiverId === selectedUser._id) {
        dispatch(setMessagesAsSeen(receiverId));
      }
    });
    return () => {
      socket.off("typing");
      socket.off("stopTyping");
      socket.off("markAsSeen");
      socket.off("messagesSeenByReceiver");
    };
  }, [selectedUser]);
  return (
    <div className="flex flex-col w-full md:h-[87vh] h-[93vh] bg-white font-sans md:px-8 py-8   ">
      {/* Header */}
      {/* Chat Title */}
      <div className="px-8 py-5 border border-gray-200 bg-slate-100 rounded-md flex space-x-2 justify-center items-center sticky top-0">
        <button
          onClick={() => dispatch(setSelectedUser(null))}
          className="text-2xl absolute hover:bg-gray-300 rounded-lg  left-[20px] p-2 cursor-pointer transition-all md:hidden block mr-8 duration-200"
        >
          <FaArrowLeft />
        </button>

        <div className="avatar">
          <div className="w-14 rounded">
            <img
              src={selectedUser.profilePic || profileImg}
              alt={`${selectedUser.fullname}'s Avatar`}
            />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-accent truncate">
          Chat with {selectedUser.fullname}
        </h2>
      </div>

      {/* YOu'll need to run a loop here  */}
      {/* Messages */}
 <div className="flex-1 w-full mt-3 px-2 overflow-y-auto overflow-x-hidden">
  {messages.length > 0
    ? messages.map((message, index) => (
        <div ref={messageEndRef} key={index}>
          {message.senderId === selectedUser._id ? (
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={selectedUser.profilePic || profileImg}
                    alt={`${selectedUser.fullname}'s Avatar`}
                  />
                </div>
              </div>
              <div className="chat-header">
                {selectedUser.fullname}
                <time className="text-xs opacity-50">
                  {TimeFormat(message.createdAt)}
                </time>
              </div>
              <div className="chat-bubble max-w-[75%] break-words">
                {message.image && (
                  <div className="w-[150px] h-[150px] avatar rounded-lg overflow-hidden mb-2">
                    <img
                      src={message.image}
                      alt="Selected"
                      className="rounded w-full h-full object-cover"
                    />
                  </div>
                )}
                <span className="block">{message.text}</span>
              </div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          ) : (
            <div className="chat chat-end">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={authUser.profilePic || profileImg}
                    alt={`${authUser.fullname}'s Avatar`}
                  />
                </div>
              </div>
              <div className="chat-header">
                {authUser.fullname}
                <time className="text-xs opacity-50">
                  {TimeFormat(message.createdAt)}
                </time>
              </div>

              {message.image ? (
                <div className="card bg-base-100 shadow-sm max-w-[75%]">
                  <figure className="max-w-full overflow-hidden">
                    <img
                      src={message.image}
                      alt="Message"
                      className="w-full h-auto object-cover"
                    />
                  </figure>
                  <div className="py-1 px-2 rounded shadow break-words">
                    <p>{message.text}</p>
                  </div>
                </div>
              ) : (
                <div className="chat-bubble max-w-[75%] break-words">
                  {message.text}
                </div>
              )}

              <div className="chat-footer opacity-50">
                {message.seen && "Seen"}
              </div>
            </div>
          )}
        </div>
      ))
    : null}

  <div>{typing && <Typing />}</div>
</div>

      {/* Input Box */}

      <ChatForm />
    </div>
  );
};
export default ChatBox;
