
import profileImg from "../assets/profile-holder.webp";
const ContactItem = ({ contact, isActive, onClick }) => {


  return (<div
    className={`flex items-center gap-4 px-6 py-4 border-b border-base-200 hover:bg-base-200 cursor-pointer transition-colors ${
      isActive ? "bg-indigo-100 border-l-4 border-blue-500" : ""
    }`}
    onClick={onClick}
  >
    <div className="avatar">
      <div className="w-12 rounded-full">
        <img
          src={contact.profilePic || profileImg}
          alt={`${contact.fullname}'s avatar`}
        />
      </div>
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <p
          className={`text-sm font-semibold ${
            isActive ? "text-blue-500" : "text-base-content"
          }`}
        >
          {contact.fullname}
        </p>
        <p
          className={`text-xs ${isActive ? "text-blue-500" : "text-base-400"}`}
        >
          time
        </p>
      </div>
      <div className="flex items-center justify-between mt-1">
        <p className="text-sm text-base-500 line-clamp-1">Hello</p>
      </div>
    </div>
  </div>);
};
export default ContactItem;
