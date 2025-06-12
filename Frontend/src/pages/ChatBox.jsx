import React from "react";

const messages = [
  { from: "Emily", text: "Hey there! How's your day going?", type: "received", avatar: "https://...emily.jpg" },
  { from: "Ethan", text: "Hi Emily! It's been pretty good, just finished a workout. How about you?", type: "sent", avatar: "https://...ethan.jpg" },
  // Add other messages here...
];

export default function ChatBox() {
  return (
    <div className="flex flex-col h-screen min-h-screen bg-white font-sans">
      {/* Header */}
      <div className="navbar border-b border-gray-200 px-10 py-3">
        <div className="flex-1 flex items-center gap-4">
          <div className="w-10 h-10 text-current">
            {/* Logo */}
            <svg viewBox="0 0 48 48" fill="none">
              <path d="..." fill="currentColor" />
            </svg>
          </div>
          <span className="text-lg font-bold">ChatterBox</span>
        </div>
        <div className="flex items-center gap-8">
          {["Home", "Explore", "Notifications"].map((link) => (
            <a key={link} href="#" className="text-sm font-medium">{link}</a>
          ))}
        </div>
        <button className="btn btn-ghost btn-circle mx-4">
          {/* Gear Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path d="..." /></svg>
        </button>
        <div className="avatar">
          <div className="w-10 rounded-full" style={{ backgroundImage: `url(https://.../profile.jpg)` }}></div>
        </div>
      </div>

      {/* Chat Title */}
      <div className="px-6 py-5">
        <h2 className="text-2xl font-bold">Chat with Emily</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-end gap-3 ${msg.type === "sent" ? "justify-end" : ""}`}
          >
            {msg.type === "received" && (
              <div
                className="avatar"
                style={{ backgroundImage: `url(${msg.avatar})` }}
              />
            )}
            <div className={`flex flex-col gap-1 max-w-xs ${msg.type === "sent" ? "items-end" : ""}`}>
              <span className="text-sm text-gray-500">{msg.from}</span>
              <div
                className={`px-4 py-3 rounded-xl text-base ${
                  msg.type === "sent" ? "bg-blue-100 text-gray-800" : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
            {msg.type === "sent" && (
              <div
                className="avatar"
                style={{ backgroundImage: `url(${msg.avatar})` }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="px-4 py-3 border-t border-gray-200">
        <div className="join w-full">
          <div className="avatar join-start">
            <div className="w-10 rounded-full" style={{ backgroundImage: `url(https://.../your-avatar.jpg)` }}></div>
          </div>
          <input
            type="text"
            placeholder="Type a message..."
            className="input input-bordered flex-grow"
          />
          <button className="btn btn-square join-end">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600"><path d="..." /></svg>
          </button>
        </div>
      </div>
    </div>
);
}
