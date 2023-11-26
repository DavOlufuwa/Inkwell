import {
  faBars,
  faMoon,
  faSearch,
  faSun,
  faTimes,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import useAuth from "../hooks/useAuth";
import { enqueueSnackbar } from "notistack";
import InkwellDark from "/images/logo-white.svg";
import InkwellLight from "/images/logo-color.svg";
import axios from "axios";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const [searchValue, setSearchValue] = useState("");

  const body = document.querySelector("body");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    const response = await axios.get("/api/logout");
    return response.data;
  };

  const logOutUser = async () => {
    try {
      await logout();
      enqueueSnackbar("Logged out successfully", { autoHideDuration: 3000 });
      setAuth({});
      navigate("/login", { replace: true });
    } catch (error) {
      enqueueSnackbar("Error logging out");
      console.log(error);
    }
  };

  const openMenu = () => {
    setMenuOpen(true);
    body?.classList.add("overflow-hidden");
  };

  const closeMenu = () => {
    setMenuOpen(false);
    body?.classList.remove("overflow-hidden");
  };
  const toggleTheme = () => {
    toggleDarkMode();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchValue) {
      return closeMenu();
    }
    navigate(`/search?q=${encodeURIComponent(searchValue)}`);
    closeMenu();
    setSearchValue(""); 
  };



  return (
    <nav className=" flex justify-between items-center w-full mx-auto pt-5">
      <div className="z-50">
        <Link
          to=""
          className="text-t-light dark:text-t-dark flex items-center min-w-max font-black uppercase text-2xl"
        >
          <img
            alt="Inkwell logo"
            className="h-8 md:h-10"
            src={darkMode ? InkwellDark : InkwellLight}
          />
        </Link>
      </div>
      <div
        className={`bg-bg-light dark:bg-bg-dark duration-300 absolute min-h-screen left-0 top-[-107%] w-full flex items-center px-8 md:px-5  lg:bg-inherit  lg:static lg:min-h-max lg:w-auto z-40 ${
          menuOpen && "top-[0%]"
        }`}
      >
        <ul className="bg-transparent w-full flex flex-col gap-8 md:mr-64 lg:mr-0 lg:flex-row lg:items-center md:gap-[3vw]">
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
          <li className="relative">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                name="search"
                id="search"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                autoComplete="off"
                placeholder="Search posts"
                className="min-w-full dark:bg-bg-light dark:text-t-light border border-d-light focus-visible:border-d-light active:border-d-light outline-none py-2 pl-2 pr-14 rounded-md lg:w-72"
              />
              <button className="absolute right-0 bg-none w-fit h-fit focus:outline-none">
                <FontAwesomeIcon
                  icon={faSearch}
                  className=" bg-d-light dark p-[11px] pt-[10px] text-xl md:p-[11px] md:pb-[10px] rounded-e-md cursor-pointer"
                  style={{ color: "white" }}
                />
              </button>
            </form>
          </li>
        </ul>
      </div>
      {/* Profile Menu */}
      <div className="flex items-center gap-4">
        {auth?.fullName && (
          <div className="z-50 relative">
            <div>
              <FontAwesomeIcon
                icon={faUserCircle}
                className="cursor-pointer w-[31px] h-8 pt-2 duration-200"
                style={{
                  color: darkMode ? "white" : "#0C056D",
                }}
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              />
            </div>
            <div
              className={`${
                profileMenuOpen ? "block" : "hidden"
              } bg-bg-light ring-1 ring-t-light absolute w-32 -bottom-[7.5rem] -left-12 p-1`}
            >
              <ul className="flex flex-col gap-2  uppercase text-sm font-extrabold">
                <li
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="duration-200 hover:bg-d-dark hover:text-t-dark py-2 px-1"
                >
                  <Link to={`profile/${auth.id}`}>View Profile</Link>
                </li>
                <li onClick={() => setProfileMenuOpen(!profileMenuOpen)}>
                  <Link
                    to="newblog"
                    role="button"
                    className="nav-link dark:text-t-light text-sm font-extrabold duration-200 hover:bg-d-dark hover:text-t-dark dark:hover:text-t-dark py-2 px-1"
                  >
                    Create a post
                  </Link>
                </li>
                <li
                  onClick={() => {
                    setProfileMenuOpen(!profileMenuOpen);
                    logOutUser();
                  }}
                >
                  <p
                    role="button"
                    className="nav-link dark:text-t-light text-sm font-extrabold duration-200 hover:bg-d-dark hover:text-t-dark dark:hover:text-t-dark py-2 px-1"
                  >
                    Log Out
                  </p>
                </li>
              </ul>
            </div>
          </div>
        )}
        {/* Theme Toggle */}
        <button
          className=" px-[10px] py-1 z-50 rounded-full flex gap-3"
          onClick={toggleTheme}
        >
          {darkMode ? (
            <FontAwesomeIcon
              icon={faSun}
              style={{
                color: darkMode ? "white" : "#0C056D",
              }}
              className="text-xl border border-t-dark rounded-full p-[6px] hover:bg-d-light"
            />
          ) : (
            <FontAwesomeIcon
              icon={faMoon}
              style={{ color: darkMode ? "white" : "#0C056D" }}
              className="text-2xl border border-t-light rounded-full px-[6px] py-[3px] hover:bg-d-dark"
            />
          )}
        </button>
        {/* Mobile Menu */}
        <div className={`cursor-pointer lg:hidden z-50`}>
          {menuOpen ? (
            <FontAwesomeIcon
              icon={faTimes}
              onClick={closeMenu}
              className="text-4xl"
              style={{ color: darkMode ? "white" : "#0C056D" }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faBars}
              onClick={openMenu}
              className="text-4xl"
              style={{ color: darkMode ? "white" : "#0C056D" }}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
