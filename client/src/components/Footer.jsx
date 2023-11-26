import useTheme from "../hooks/useTheme";
import InkwellDark from "/images/logo-white.svg";
import InkwellLight from "/images/logo-color.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  const { darkMode } = useTheme();
  const mainStyle = { color: darkMode ? "white" : "#0C056D" };
  return (
    <footer className="border-t border-[#0C056D] dark:border-c-dark mt-20 py-5 px-3 flex flex-col gap-5 md:flex-row md:gap-24 lg:justify-around">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-12 md:translate-y-1">
        <img
          alt="Inkwell logo"
          className="h-8 md:h-10 w-fit"
          src={darkMode ? InkwellDark : InkwellLight}
        />
        <Link to="/login" className="text-lg text-[#0C056D] dark:text-t-dark">
          log in
        </Link>
        <Link to="/login" className="text-lg text-[#0C056D] dark:text-t-dark">
          sign up
        </Link>
      </div>
      <div className="flex justify-between items-center mt-3 md:items-baseline md:gap-10 lg:gap-32">
        <div className="flex gap-7 ">
          <div role="link">
            <Link to="https://twitter.com/D_lufuwa" target="_blank">
              <FontAwesomeIcon
                icon={faXTwitter}
                className="h-6"
                style={mainStyle}
              />
            </Link>
          </div>
          <div role="link">
            <Link to="https://github.com/DavOlufuwa" target="_blank">
              <FontAwesomeIcon
                icon={faGithub}
                className="h-6"
                style={mainStyle}
              />
            </Link>
          </div>
          <div role="link">
            <Link to="https://www.linkedin.com/in/davolufuwa" target="_blank">
              <FontAwesomeIcon
                icon={faLinkedin}
                className="h-6"
                style={mainStyle}
              />
            </Link>
          </div>
        </div>
        <div className="text-xs text-[#0C056D] dark:text-t-dark">
          © {new Date().getFullYear()} Inkwell.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
