/* eslint-disable react/no-unescaped-entities */
import { useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../routes/authRequests";
import useAuth from "../hooks/useAuth";
import { enqueueSnackbar } from "notistack";

const Login = () => {
  const { auth, setAuth } = useAuth();
  const emailRef = useRef();
  const pwdRef = useRef();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (newUser) => {
      queryClient.setQueryData("auth", newUser);
      enqueueSnackbar(`Welcome back, ${newUser.fullName}!`, {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        }
      });
      setCredentials({
        ...credentials,
        email: "",
        password: "",
      });

      setAuth({
        ...auth,
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        accessToken: newUser.accessToken,
        role: newUser.role
      });
      navigate(from, { replace: true });
    },
    onError: () => {
      emailRef.current.value = "";
      pwdRef.current.value = "";
      enqueueSnackbar("Error logging in, please try again");
    },
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(credentials);
  };

  return (
    <div className="min-h-[70svh]">
      <div className="text-t-light dark:text-t-dark text-center text-xl my-12">
        <h2>
          Sign in to your <span className="font-black uppercase">Inkwell</span>{" "}
          account
        </h2>
      </div>
      <section className="sm:grid sm:place-content-center">
        <div>
          <form onSubmit={handleSubmit} className="form-case">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                autoComplete="off"
                id="email"
                ref={emailRef}
                placeholder="johndoe@gmail.com"
                required
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                ref={pwdRef}
                placeholder="password"
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn">
              Login
            </button>
          </form>
        </div>
        <div>
          <div className="mt-10 text-center text-t-light dark:text-t-dark">
            Don't have an account ?{" "}
            <Link
              to="/signup"
              className="underline font-bold tracking-wide text-d-light"
            >
              Create one here
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
