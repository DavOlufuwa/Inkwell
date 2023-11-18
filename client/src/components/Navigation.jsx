import {
  faBars,
  faMoon,
  faSearch,
  faSun,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const body = document.querySelector("body");
  const html = document.querySelector("html");

  const openMenu = () => {
    setMenuOpen(true);
    body?.classList.add("overflow-hidden");
  };

  const toggleDarkMode = () => {
    html?.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    body?.classList.remove("overflow-hidden");
  };

  return (
    <nav className=" flex justify-between items-center w-full mx-auto pt-5">
      <div className="z-50">
        <Link
          to=""
          className="text-t-light dark:text-t-dark flex items-center min-w-max font-black uppercase text-2xl"
        >
          INKWELL
        </Link>
      </div>
      <div
        className={` bg-bg-light dark:bg-bg-dark duration-300 absolute min-h-screen left-0 top-[-100%] w-full flex items-center px-8 md:px-5 lg:static lg:min-h-max lg:w-auto z-40 ${
          menuOpen && "top-[0%]"
        }`}
      >
        <ul className=" bg-inherit w-full flex flex-col gap-8 md:flex-row md:items-center md:gap-[3vw]">
          <li>
            <NavLink to="login" className="nav-link" onClick={closeMenu}>
              Log in
            </NavLink>
          </li>
          <li className="relative">
            <NavLink to="signup" className="nav-link" onClick={closeMenu}>
              Sign up
            </NavLink>
          </li>
          <li className="boom">
            <NavLink
              to="scheduledrive"
              className="nav-link"
              onClick={closeMenu}
            >
              Log Out
            </NavLink>
          </li>
          <li className="relative">
            <input
              type="text"
              placeholder="Search Blogs"
              className="min-w-full dark:bg-bg-light dark:text-t-light border border-d-light focus-visible:border-d-light active:border-d-light outline-none py-3 pl-2 pr-14 rounded-md lg:w-72 "
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute right-0 bg-d-light dark p-[15px] pt-[14px] text-xl md:p-[14px] md:pb-[15px] rounded-e-md cursor-pointer"
              style={{ color: "white" }}
            />
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-4">
        <button
          className=" px-[10px] py-1 z-50 rounded-full flex gap-3"
          onClick={toggleDarkMode}
        >
          {darkMode ? (
            <FontAwesomeIcon
              icon={faSun}
              style={{
                color: darkMode ? "white" : "black",
              }}
              className="text-xl border border-t-dark rounded-full p-[6px] hover:bg-d-light"
            />
          ) : (
            <FontAwesomeIcon
              icon={faMoon}
              style={{ color: darkMode ? "white" : "black" }}
              className="text-2xl border border-t-light rounded-full px-[6px] py-[3px] hover:bg-d-dark"
            />
          )}
        </button>
        <div className={`cursor-pointer lg:hidden z-50`}>
          {menuOpen ? (
            <FontAwesomeIcon
              icon={faTimes}
              onClick={closeMenu}
              className="text-4xl"
              style={{ color: darkMode ? "white" : "black" }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faBars}
              onClick={openMenu}
              className="text-4xl"
              style={{ color: darkMode ? "white" : "black" }}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
