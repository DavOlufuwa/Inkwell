/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
    ? true
    : false
  );

  const html = document.querySelector("html");

  useEffect(() => {
    if(darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);

  }, [darkMode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    
    setDarkMode(newMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
