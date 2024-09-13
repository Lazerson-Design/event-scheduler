import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { onLogout } = useContext(AuthContext);
  const navigate = useNavigate(); // Call useNavigate inside the component

  return (
    <div className="navbar bg-base-100">
      {/* Navbar title linking to the homepage */}
      <div className="flex-1">
        <NavLink to="/" className="btn btn-ghost text-xl">
          Event-Scheduler
        </NavLink>
      </div>

      <div className="flex-none">
        {/* Create Event Button */}
        <NavLink to="/create-event" className="btn btn-success text-white mx-4">
          Add Event
        </NavLink>

        {/* Dropdown for user profile options */}
        <div className="dropdown dropdown-end">
          {/* Avatar button that triggers the profile dropdown */}
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            {/* Displaying the user avatar */}
            <div className="w-10 rounded-full">
              <img
                alt="User avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          {/* Dropdown content with user options */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {/* Profile link with a badge */}
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            {/* Settings link */}
            <li>
              <a>Settings</a>
            </li>
            {/* Logout link */}
            <li>
              <a
                onClick={() => {
                  onLogout();
                  navigate("/"); // Navigate to homepage after logout
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
