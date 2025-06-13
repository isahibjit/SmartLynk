import React from "react";
import { useSelector } from "react-redux";
import profileImg from "../assets/profile-holder.webp";
import { FaRobot } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";

const ChatBox = () => {
  const { selectedUser } = useSelector((state) => state.chat);
  const { authUser } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col w-full  h-screen bg-white font-sans md:px-8   ">
      {/* Header */}
      {/* Chat Title */}
      <div className="px-8 py-5 border border-gray-200 bg-slate-100 rounded-md flex space-x-2 justify-center items-center sticky top-0">
       
            <button className=" text-2xl absolute hover:bg-gray-300 rounded-lg  left-[20px] p-2 cursor-pointer transition-all md:hidden block mr-8 duration-200"><FaArrowLeft /></button>
  
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

      {/* Messages */}

      <div className="flex-1 overflow-y mt-3 px-2">
        <div className="chat chat-start ">
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
            <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="chat-bubble">You were the Chosen One!</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>

        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                src={authUser.profilePic || profileImg}
                alt={`${selectedUser.fullname}'s Avatar`}
              />
            </div>
          </div>
          <div className="chat-header">
            {authUser.fullname}
            <time className="text-xs opacity-50">12:46</time>
          </div>
          <div className="chat-bubble">I hate you!</div>
          <div className="chat-footer opacity-50">Seen at 12:46</div>
        </div>
      </div>
      {/* Input Box */}
      <div className="flex  gap-3 my-2 sticky bottom-2 px-2 pt-3">
        <input
          type="text"
          placeholder="Send Message"
          className="flex-grow border border-gray-300 rounded-md py-2 px-3 text-md outline-none w-full"
        />
        <div className="flex gap-2">
          <button className="btn btn-accent">
            <RiImageAddFill className="text-xl" />
          </button>
          <button className="btn btn-primary flex items-center gap-1">
            <IoSend />
            <span className="hidden md:inline">Send</span>
          </button>
          <button className="btn btn-secondary flex items-center gap-1">
            <FaRobot />
            <span className="hidden md:inline">Suggest</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChatBox;
