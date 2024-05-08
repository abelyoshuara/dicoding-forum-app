import { useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { putAccessToken } from "../utils";
import { unsetAuthUser } from "../redux/authUser/authUserSlice";

function Header() {
  const { name, email, avatar } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(unsetAuthUser());
    putAccessToken("");
  };

  return (
    <header>
      <div className="navbar navbar-floating navbar-glass mt-0 max-w-full rounded-none border-b border-gray-300 dark:border-gray-800 px-0 shadow-none">
        <div className="container flex flex-col md:flex-row">
          <div className="navbar-start">
            <span
              className="-ms-1 block cursor-pointer md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <BiX size={40} /> : <BiMenu size={40} />}
            </span>
            <NavLink
              to={"/"}
              className="navbar-item me-auto py-0 ps-1 text-lg font-bold"
            >
              Dicoding Forum
            </NavLink>
            <div className="block md:hidden">
              {email && (
                <div className="avatar avatar-ring avatar-md">
                  <div className="dropdown-container">
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-ghost flex cursor-pointer px-0"
                        tabIndex={0}
                      >
                        <img src={avatar} alt={name} />
                      </button>
                      <div className="dropdown-menu gap-1">
                        <div className="dropdown-item" tabIndex={-1}>
                          <p className="text-sm leading-5 text-content1">
                            Logged in as
                          </p>
                          <p className="truncate text-sm leading-5 text-content2">
                            <strong>{email}</strong>
                          </p>
                        </div>
                        <a
                          className="dropdown-item flex w-full justify-between text-left text-sm leading-5 text-red-500"
                          role="menuitem"
                          onClick={() => handleLogout()}
                        >
                          <span>Logout</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            className={`${isOpen ? "flex" : "hidden"} flex-col md:flex md:flex-row`}
          >
            <div className="navbar-end me-3 flex-col items-start md:flex-row">
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `navbar-item ${isActive ? "text-blue-500" : ""}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to={"/leaderboards"}
                className={({ isActive }) =>
                  `navbar-item ${isActive ? "text-blue-500" : ""}`
                }
              >
                Leaderboard
              </NavLink>
            </div>

            {email ? (
              <div className="navbar-end">
                <div className="avatar avatar-ring avatar-md">
                  <div className="dropdown-container">
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-ghost flex cursor-pointer px-0"
                        tabIndex={0}
                      >
                        <img src={avatar} alt={name} />
                      </button>
                      <div className="dropdown-menu gap-1">
                        <div className="dropdown-item" tabIndex={-1}>
                          <p className="text-sm leading-5 text-content1">
                            Logged in as
                          </p>
                          <p className="truncate text-sm leading-5 text-content2">
                            <strong>{email}</strong>
                          </p>
                        </div>
                        <a
                          className="dropdown-item flex w-full justify-between text-left text-sm leading-5 text-red-500"
                          role="menuitem"
                          onClick={() => handleLogout()}
                        >
                          <span>Logout</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-2 flex gap-x-2 md:mt-0">
                <NavLink to={"/login"} className="btn btn-solid-primary">
                  Login
                </NavLink>
                <NavLink to={"/register"} className="btn btn-primary">
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
