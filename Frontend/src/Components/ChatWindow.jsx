import React from "react";

const ChatWindow = () => (
  <div className="flex-1 flex-col bg-base-200 md:flex hidden">
    <div className="flex items-center justify-between p-6 border-b border-base-300">
      <div>
        <h2 className="text-xl font-semibold">AI-Enhanced Chat</h2>
        <p className="text-sm text-base-500">Welcome to the chat dashboard</p>
      </div>
 
    </div>
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-2xl font-semibold text-base-700 mb-2">No Chat Selected</h2>
      <p className="text-base-500 max-w-md">
        Select a contact to start chatting or view message history. Your conversations are enhanced with AI capabilities.
      </p>
    </div>
  </div>
);
export default ChatWindow