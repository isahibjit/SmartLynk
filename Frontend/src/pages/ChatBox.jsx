import React from "react";
import { useSelector } from "react-redux";
import profileImg from "../assets/profile-holder.webp";
import { FaRobot } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { IoSend } from "react-icons/io5";

const messages = [
  {
    from: "Emily",
    text: "Hey there! How's your day going?",
    type: "received",
    avatar: "https://...emily.jpg",
  },
  {
    from: "Ethan",
    text: "Hi Emily! It's been pretty good, just finished a workout. How about you?",
    type: "sent",
    avatar: "https://...ethan.jpg",
  },
  // Add other messages here...
];

const ChatBox = () => {
  const { selectedUser } = useSelector((state) => state.chat);
  const { authUser } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col  bg-white font-sans px-8">
      {/* Header */}
      {/* Chat Title */}
      <div className="px-8 py-5 border border-gray-200 rounded-md flex space-x-2 justify-center items-center sticky top-0">
        <div className="avatar">
          <div className="w-14 rounded">
            <img
              src={selectedUser.profilePic || profileImg}
              alt={`${selectedUser.fullname}'s Avatar`}
            />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-accent">
          Chat with {selectedUser.fullname}
        </h2>
      </div>

      {/* Messages */}

      <div className="h-[75vh]">
        <div class="chat chat-start ">
          <div class="chat-image avatar">
            <div class="w-10 rounded-full">
              <img
                src={selectedUser.profilePic || profileImg}
                alt={`${selectedUser.fullname}'s Avatar`}
              />
            </div>
          </div>
          <div class="chat-header">
            {selectedUser.fullname}
            <time class="text-xs opacity-50">12:45</time>
          </div>
          <div class="chat-bubble">You were the Chosen One!</div>
          <div class="chat-footer opacity-50">Delivered</div>
        </div>

        <div class="chat chat-end">
          <div class="chat-image avatar">
            <div class="w-10 rounded-full">
              <img
                src={authUser.profilePic || profileImg}
                alt={`${selectedUser.fullname}'s Avatar`}
              />
            </div>
          </div>
          <div class="chat-header">
            {authUser.fullname}
            <time class="text-xs opacity-50">12:46</time>
          </div>
          <div class="chat-bubble">I hate you!</div>
          <div class="chat-footer opacity-50">Seen at 12:46</div>
        </div>
      </div>
      {/* Input Box */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Type here"
          className="border border-gray-300 rounded-md py-2 px-1 text-md w-[50vw] outline-none "
        />
        <button className="btn btn-accent">
          <RiImageAddFill className="text-2xl" />
        </button>
        <button className="btn btn-primary">
          <span>
            <IoSend />
          </span>
          <span>Send</span>
        </button>
        <button className="btn btn-secondary">
          <span>
            <FaRobot />
          </span>
          <span>Suggest Reply</span>
        </button>
      </div>
    </div>
  );
};
export default ChatBox;
