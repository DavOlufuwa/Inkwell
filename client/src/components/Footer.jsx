import useTheme from "../hooks/useTheme";
import InkwellDark from "/images/logo-white.svg";
import InkwellLight from "/images/logo-color.svg";

const Footer = () => {
  const {darkMode} = useTheme()
  return (
    <footer>
      <div>
        <img
          alt="Inkwell logo"
          className="h-8 md:h-10"
          src={darkMode ? InkwellDark : InkwellLight}
        />
      </div>
      <div>
        <div>
          © 2022 - {new Date().getFullYear()} Inkwell.
        </div>
      </div>
    </footer>
  );
}

export default Footer