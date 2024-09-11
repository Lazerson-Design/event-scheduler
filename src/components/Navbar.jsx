import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-slate-300 flex-wrap">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Event-Scheduler</a>
      </div>
      <div className="flex-none ">
        <ul className="menu menu-horizontal px-1 gap-5 font-bold mr-10">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/addEvent">Add Event</NavLink>
          </li>
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://imgs.search.brave.com/twkipH7hdreu1BLGIZl4bXwBFPxGBtbLmKzy8xeplVI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTMw/MzI3NDI3NS92ZWN0/b3IvZC1zdHlsZS1s/b2dvLWljb24tc2hh/cGUuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPVEweTNURERC/cnJGQndSQ2R6VGdf/T1hMaGhwUGdoMFIt/YzctLVZqYmJTSnM9"
              />
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
