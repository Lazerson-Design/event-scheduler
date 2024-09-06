import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-slate-300 flex-wrap">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Event-Scheduler</a>
      </div>
      <div className="flex-none ">
        <ul className="menu menu-horizontal px-1 gap-5 font-bold ">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/SignUp">Sign up</NavLink>
          </li>
          <li>
            <NavLink to="/SignIn">Sign in</NavLink>
          </li>
          <li>
            <NavLink to="/Event">Event</NavLink>
          </li>
          <li>
            <NavLink to="/EventDetails">Event details</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
