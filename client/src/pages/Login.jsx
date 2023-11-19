/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../routes/authRequests";
import useAuth from "../hooks/useAuth";
import { enqueueSnackbar } from "notistack";

const Login = () => {
  const { auth, setAuth } = useAuth();
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
      enqueueSnackbar(`Welcome back, ${newUser.fullName}!`, {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        }
      });
      setCredentials({
        email: "",
        password: "",
      });
      setAuth({
        ...auth,
        email: newUser.email,
        fullName: newUser.fullName,
        accessToken: newUser.accessToken,
      });
      setTimeout(() => {
        console.log(auth);
      }, 3000)
      navigate(from, { replace: true });
    },
    onError: () => {
      enqueueSnackbar("Error logging in, please try again");
      setCredentials({
        email: "",
        password: "",
      });
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
              <label htmlFor="username">Email Address</label>
              <input
                type="email"
                name="email"
                autoComplete="off"
                id="email"
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
