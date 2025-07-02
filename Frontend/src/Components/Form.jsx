import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRobot } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { Image, Send, X } from "lucide-react";
import { IoSend } from "react-icons/io5";
import { sendMessage, setTyping } from "../features/chat/chatSlice";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
const Form = () => {
  const typingTimeoutRef = useRef(null);
  const { selectedUser, messages, typing, isMessageSending } = useSelector(
    (state) => state.chat
  );
  const { socket, authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const inputTextRef = useRef(null);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [formData, setFormData] = useState({
    text: "",
    image: null,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.text !== "" || formData.image) {
      const { _id: id } = selectedUser;
      const sendMessageData = { formData, id };
      try {
        await dispatch(sendMessage(sendMessageData)).unwrap();
        setFormData((prev) => ({ ...prev, image: "", text: "" }));
      } catch (error) {
        toast.error("Message not send !");
        console.log(error);
      }
    }
  };
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
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (!typing) {
      if (socket && socket.connected) {
        socket.emit("typing", { to: selectedUser._id });
      }
    }
    typingTimeoutRef.current = setTimeout(() => {
      if (socket && socket.connected) {
        socket.emit("stopTyping", { to: selectedUser._id });
        setTyping(false);
      }
    }, 2000);
  };
  const handleSuggestBtn = async (e) => {
    if (!messages || messages.length === 0) {
      toast.error("You haven't started the convo yet")
      return
    }
    
    setSuggestLoading(true);
    const prompt = messages
      .slice(-10)
      .map((m) =>
        m.senderId === selectedUser._id
          ? `${selectedUser.fullname} said : ${m.text}`
          : `I said : ${m.text}`
      );
    try {
      const response = await axiosInstance.post("/ai/get-response", prompt);
      console.log(response.data);
      console.log(inputTextRef.current.value);
      // Append AI response to input
      setFormData((prev) => ({
        ...prev,
        text: prev.text + " " + response.data.message,
      }));

      setSuggestLoading(false);
    } catch (error) {
      console.log(error);
      setSuggestLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex  gap-3 mt-2 sticky bg-white bottom-2 px-2 pt-3 relative"
    >
      <input
        type="text"
        placeholder="Send Message"
        value={formData.text}
        name="text"
        onChange={handleInputChange}
        className="flex-grow border border-gray-300 rounded-md py-2 px-3 text-md outline-none w-full"
        ref={inputTextRef}
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
        <button type="submit" className="btn btn-primary sm:w-[100px]">
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
        <button
          onClick={handleSuggestBtn}
          className="btn btn-secondary flex items-center gap-1 sm:w-[100px]"
          type="button"
          disabled={suggestLoading}
        >
          {!suggestLoading ? (
            <div className="flex items-center gap-2">
              <FaRobot />
              <span className="hidden md:inline">Suggest</span>
            </div>
          ) : (
            <img
              src="https://raw.githubusercontent.com/n3r4zzurr0/svg-spinners/main/preview/90-ring-with-bg-white-36.svg"
              alt="loading animation"
            />
          )}
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
  );
};

export default Form;
