import React, { useEffect, useRef, useState } from "react";
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
  sendMessage,
  isMessageSending,
  getMessages,
} from "../features/chat/chatSlice";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import TimeFormat from "../lib/TimeFormat";
import { subscribeToMessage } from "../redux/socketActions";

const ChatBox = () => {
  const { selectedUser, isSelectedForMobile, messages } = useSelector(
    (state) => state.chat
  );
  const messageEndRef = useRef(null)
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
useEffect(() => {
  if (messageEndRef.current) {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [messages]);
  const [formData, setFormData] = useState({
    text: "",
    image: null,
  });
  const handleNewImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64 = reader.result;
      setFormData((prev) => ({ ...prev, image: base64 }));
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.text !== "" || formData.image) {
      const { _id: id } = selectedUser;
      const sendMessageData = { formData, id };
      try {
        await dispatch(sendMessage(sendMessageData)).unwrap();
        // dispatch(getMessages(selectedUser._id)); // Optional but safe
        setFormData((prev) => ({ ...prev, image: "", text: "" }));
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
      } catch (error) {
        toast.error("Fetch UnsuccessFul");
      }
    };
    fetchMessages();
    dispatch(subscribeToMessage());
  }, [selectedUser, subscribeToMessage, dispatch]);

  return (
    <div className="flex flex-col w-full h-[90vh] bg-white font-sans md:px-8 py-8   ">
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
      <div
     
      className="flex-1  mt-3 px-2  overflow-y-auto">
        {messages.length > 0
          ? messages.map((message, index) => (
              <div  ref={messageEndRef} key={index}>
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
                    <div className="chat-bubble">
                      {message.image && (
                        <div className="w-[150px] h-[150px] left-[10px] avatar rounded-lg">
                          <img
                            src={message.image}
                            alt="Selected"
                            className="rounded"
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
                      <div className="card bg-base-100 w-38 shadow-sm">
                        <figure>
                          <img src={message.image} alt="Shoes" />
                        </figure>
                        <div className="card-body">
                          <p>{message.text}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="chat-bubble">{message.text}</div>
                    )}

                    <div className="chat-footer opacity-50">
                      {message.seen && "Seen"}
                    </div>
                  </div>
                )}
              </div>
            ))
          : null}
      </div>

      {/* Input Box */}

      <form
        onSubmit={handleSubmit}
        className="flex  gap-3 my-2 sticky bg-white bottom-2 px-2 pt-3 relative"
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
        <div className="flex gap-2  ">
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
            className="btn btn-primary sm:w-[100px]"
          >

               {!isMessageSending ? (
                 <div className="flex items-center gap-1 ">
                  <IoSend />
                  <span className="hidden md:inline">Send</span>
                </div>
              ) : (
                <img
                className="w-[30px]"
                  src="https://raw.githubusercontent.com/n3r4zzurr0/svg-spinners/main/preview/90-ring-with-bg-white-36.svg"
                  alt="loading animation"
                />
              )}
          </button>
          <button className="btn btn-secondary flex items-center gap-1 sm:w-[100px]">
            <FaRobot />
            <span className="hidden md:inline">Suggest</span>
          </button>
        </div>

        {/* Image upload preview or pop-up */}
        {formData?.image && (
          <div className="w-[150px] h-[150px] absolute -top-[160px] left-[10px] avatar rounded-lg  z-50 ">
            <img
              src={formData.image}
              alt={`Your selected Image`}
              className="rounded"
            />
            <button
              onClick={() => setFormData((prev) => ({ ...prev, image: null }))}
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
