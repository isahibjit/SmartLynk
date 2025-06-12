import React from "react";
import ContactItem from "./ContactItem";
import { useSelector } from "react-redux";
const ChatSidebar = ({activeChat, onContactClick }) => {
    const { users } = useSelector((state) => state.chat);
  return (
    <div className="w-[420px] flex flex-col border-r border-base-300">
      <div className="p-6 border-b border-base-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Contacts</h2>
          <div className="form-control">
            <label className="label cursor-pointer space-x-2">
              <span className="label-text text-sm">Show Online Only</span>
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-sm"
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
        {users.map((contact) => (
          <ContactItem
            key={contact._id}
            contact={contact}
            isActive={activeChat === contact._id}
            onClick={() => onContactClick(contact._id)}
          />
        ))}
      </div>
    </div>
  );
};
export default ChatSidebar;
