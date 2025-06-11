import React from "react";
import logo from "/logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../features/auth/authSlice";
import toast from "react-hot-toast";
const Navbar = () => {
  const { authUser,isSigningOut } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const handleLogout = async()=>{
    try {
      await dispatch(signOut()).unwrap()
       toast.success("Signed out Successfully!")
    } catch (error) {
      toast.error(error)
    }
  }
  return (
    <header className="navbar  bg-base-100 shadow-md px-4 sm:px-10">
      <div className="flex-1 flex items-center gap-3">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-36 sm:w-40" />
        </Link>
        <h1 className="text-sm sm:text-xl font-bold text-gray-500">
          AI That Talks Your Talk
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Settings Button */}

        {authUser && (
          <div className="dropdown dropdown-bottom dropdown-center">
            <div tabIndex={0} role="button" className="m-1">
              <button
                aria-label="Settings"
                className="flex items-center  justify-center rounded-full h-10 w-10 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-700 transition-colors"
              >
                <svg
                  fill="currentColor"
                  height="32px"
                  viewBox="0 0 256 256"
                  width="32px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"></path>
                </svg>
              </button>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <a 
                onClick={handleLogout}
                className="text-lg text-primary border border-black">
                  {!isSigningOut ? (
                  <span>Logout</span>
                ) : (
                  <img
                    src="https://raw.githubusercontent.com/n3r4zzurr0/svg-spinners/main/preview/90-ring-with-bg-white-36.svg"
                    alt="loading animation"
                  />
                )}
                </a>
              </li>
              <li className="my-2">
                <a className="text-lg text-secondary border border-black">
                  Themes
                </a>
              </li>
            </ul>
          </div>
        )}

        {/* Profile Avatar */}
        <div className="avatar">
          <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <Link to="/update-profile">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO_XIUSATfo7OfPkp6af9pB88MBFGzDdiazU6DGK3rc5XFCZcdICPkDMbXVW-hEQzNd0jzK5rzcWy6rHOztGL4o-bsGa2qhr4HsC23QJ-NzTkMhKKes9oE5xc24aqtEX5OB5Gmlw8BwKnNiQxZaqIh3IZezyHHAlFQUJsX_PfS8HKMGWqwbgfiPIqt6OmlVK9rr1Wr-9KHESDmWNAXVeoZNIlf5d_O3kJznui-Z1o2Te8hadRX9SH5tC06c7S2vXM600GawXpyNIg"
                alt="User Avatar"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
