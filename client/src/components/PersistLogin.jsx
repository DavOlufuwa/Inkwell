import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refreshMutation = useRefreshToken();
  const { auth, persist } = useAuth();
  const { darkMode } = useTheme();

  useEffect(() => {
    let isMounted = true
    const verifyRefreshToken = async () => {
      try {
        await refreshMutation.mutateAsync();
      } catch (error) {
        console.error(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !auth?.accessToken && persist
      ? verifyRefreshToken()
      : setIsLoading(false);

      return () => isMounted = false

  }, []);


  return (
    <>
      {isLoading ? (
        <svg
          width="38"
          height="38"
          viewBox="0 0 38 38"
          xmlns="http://www.w3.org/2000/svg"
          fill={darkMode ? "white" : "black"}
        >
          <defs>
            <linearGradient
              x1="8.042%"
              y1="0%"
              x2="65.682%"
              y2="23.865%"
              id="a"
            >
              <stop stopColor="#fff" stopOpacity="0" offset="0%" />
              <stop stopColor="#fff" stopOpacity=".631" offset="63.146%" />
              <stop stopColor="#fff" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)">
              <path
                d="M36 18c0-9.94-8.06-18-18-18"
                id="Oval-2"
                stroke="url(#a)"
                strokeWidth="2"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="0.9s"
                  repeatCount="indefinite"
                />
              </path>
              <circle fill="#fff" cx="36" cy="18" r="1">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="0.9s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>
        </svg>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
