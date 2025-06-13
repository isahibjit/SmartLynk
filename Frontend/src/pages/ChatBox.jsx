import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import profileImg from "../assets/profile-holder.webp";
import { FaRobot } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import {
  setSelectedUser,
  setIsSelectedForMobile,
  selectedUser,
  messages,
  sendMessage,
  getMessages,
} from "../features/chat/chatSlice";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const ChatBox = () => {
  const { selectedUser, isSelectedForMobile,messages } = useSelector(
    (state) => state.chat
  );
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    text: "",
    selectedImage: null,
  });
  const handleNewImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64 = reader.result;
      setFormData((prev) => ({ ...prev, selectedImage: base64 }));
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.text !== "") {
      const { _id: id } = selectedUser;
      const sendMessageData = { formData, id };
      try {
        await dispatch(sendMessage(sendMessageData)).unwrap();
        toast.success("Message Send Successfully");
      } catch (error) {
        toast.error("Message not send !");
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        await dispatch(getMessages(selectedUser._id)).unwrap();
        toast.success("Fetch SuccessFul");
      } catch (error) {
        toast.error("Fetch UnsuccessFul");
      }
    };
    fetchMessages();
    console.log(selectedUser._id)
  }, [selectedUser]);
  console.log(messages)
  return (
    <div className="flex flex-col w-full  h-screen bg-white font-sans md:px-8   ">
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

      {/* Messages */}
      {/* YOu'll need to run a loop here  */}
      <div className="flex-1 overflow-y-auto mt-3 px-2">
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
          {/* shouldn't come from formData but when you receive it ! */}
          <div className="chat-bubble">
            {formData.selectedImage && (
              <div className="w-[150px] h-[150px] left-[10px] avatar rounded-lg ">
                <img
                  src={formData.selectedImage}
                  alt={`Your selected Image`}
                  className="rounded"
                />
              </div>
            )}
            <span className="block">You were the Chosen One!</span>
          </div>
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
          {formData.selectedImage && (
            <div className="w-[150px] h-[150px] left-[10px] avatar rounded-lg ">
              <img
                src={formData.selectedImage}
                alt={`Your selected Image`}
                className="rounded"
              />
            </div>
          )}
          <div className="chat-bubble">I hate you!</div>
          <div className="chat-footer opacity-50">Seen at 12:46</div>
        </div>
      </div>
      {/* Input Box */}

      <form
        onSubmit={handleSubmit}
        className="flex  gap-3 my-2 sticky bottom-2 px-2 pt-3 relative"
      >
        <input
          type="text"
          placeholder="Send Message"
          value={formData.text}
          name="text"
          onChange={(e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
          }}
          className="flex-grow border border-gray-300 rounded-md py-2 px-3 text-md outline-none w-full"
        />
        <div className="flex gap-2">
          <label htmlFor="upload-picture" className="btn btn-accent">
            <RiImageAddFill className="text-xl" />
          </label>
          <input
            accept="image/*"
            className="sr-only"
            id="upload-picture"
            type="file"
            onChange={handleNewImage}
          />
          <button
            type="submit"
            className="btn btn-primary flex items-center gap-1"
          >
            <IoSend />
            <span className="hidden md:inline">Send</span>
          </button>
          <button className="btn btn-secondary flex items-center gap-1">
            <FaRobot />
            <span className="hidden md:inline">Suggest</span>
          </button>
        </div>

        {/* Image upload preview or pop-up */}
        {formData?.selectedImage && (
          <div className="w-[150px] h-[150px] absolute -top-[160px] left-[10px] avatar rounded-lg  z-50 ">
            <img
              src={formData.selectedImage}
              alt={`Your selected Image`}
              className="rounded"
            />
            <button
              onClick={() =>
                setFormData((prev) => ({ ...prev, selectedImage: null }))
              }
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-5 cursor-pointer hover:scale-115 transition-all duration-200" />
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
export default ChatBox;
