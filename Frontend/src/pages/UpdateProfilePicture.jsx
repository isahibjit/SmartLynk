import React from "react";
import { useSelector } from "react-redux";

const UpdateProfilePicture = () => {
    const { authUser, isSigningUp, isLogginIn, isCheckingAuth, onlineUsers } =
    useSelector((state) => state.auth);

  return (
    <div className="min-h-screen">
      <div className="flex flex-1 justify-center py-8 sm:py-12 px-4">
        <div className="flex flex-col w-full max-w-lg mt-12 bg-white shadow-lg rounded-xl p-6 sm:p-8">
          <h1 className="text-primary text-2xl sm:text-3xl font-bold leading-tight tracking-tight mb-6 text-center">
            Update Profile Picture
          </h1>

          <div className="flex flex-col items-center mb-8">
            <div
              className="relative bg-center bg-no-repeat aspect-square bg-cover rounded-full size-32 sm:size-36 mb-4 border-4 border-slate-200 shadow-md"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDO_XIUSATfo7OfPkp6af9pB88MBFGzDdiazU6DGK3rc5XFCZcdICPkDMbXVW-hEQzNd0jzK5rzcWy6rHOztGL4o-bsGa2qhr4HsC23QJ-NzTkMhKKes9oE5xc24aqtEX5OB5Gmlw8BwKnNiQxZaqIh3IZezyHHAlFQUJsX_PfS8HKMGWqwbgfiPIqt6OmlVK9rr1Wr-9KHESDmWNAXVeoZNIlf5d_O3kJznui-Z1o2Te8hadRX9SH5tC06c7S2vXM600GawXpyNIg")',
              }}
            >
              <div className="absolute -bottom-2 -right-2 size-10 bg-[#0c7ff2] rounded-full flex items-center justify-center text-white shadow-md hover:bg-blue-600 transition-colors cursor-pointer">
                <svg
                  className="lucide lucide-camera"
                  fill="none"
                  height="20"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </div>
            </div>

            <div className="text-center">
              <p className="text-slate-800 text-xl sm:text-2xl font-semibold leading-tight">
                {authUser.fullname}
              </p>
              <p className="text-slate-500 text-sm sm:text-base font-normal">
                {authUser.email}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 mb-8">
            <label
              htmlFor="upload-picture"
              className="flex w-full items-center justify-center gap-2 cursor-pointer rounded-lg h-11 px-4 bg-[#0c7ff2] text-white text-sm font-medium hover:bg-blue-600 transition-shadow shadow-sm hover:shadow-md"
            >
              <svg
                className="lucide lucide-upload-cloud"
                fill="none"
                height="18"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="M12 12v9" />
                <path d="m16 16-4-4-4 4" />
              </svg>
              <span className="truncate">Upload New Picture</span>
            </label>
            <input
              accept="image/*"
              className="sr-only"
              id="upload-picture"
              type="file"
            />

            <button className="flex w-full items-center justify-center gap-2 rounded-lg h-11 px-4 bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition-colors">
              <svg
                className="lucide lucide-trash-2"
                fill="none"
                height="18"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" x2="10" y1="11" y2="17" />
                <line x1="14" x2="14" y1="11" y2="17" />
              </svg>
              <span className="truncate">Remove Picture</span>
            </button>
          </div>

          <button className="btn btn-primary w-full h-12 text-base font-semibold tracking-wide">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePicture;
