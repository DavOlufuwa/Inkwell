import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../routes/authRequests";
import { enqueueSnackbar } from "notistack";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const newUserMutation = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      enqueueSnackbar("New account created successfully", {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      setCredentials({
        email: "",
        firstname: "",
        lastname: "",
        password: "",
      });
      navigate(from, { replace: true });
    },
    onError: () => {
      enqueueSnackbar("Something went wrong while creating your account" ,);
      setCredentials({
        email: "",
        firstname: "",
        lastname: "",
        password: "",
      });
    },
  });

  const [credentials, setCredentials] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newUserMutation.mutate(credentials);
  };

  return (
    <div className="min-h-[90svh] flex flex-col">
      <div className="text-t-light dark:text-t-dark text-center text-xl my-12">
        <h2>
          Create your <span className="font-black uppercase">Inkwell</span>{" "}
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
                id="email"
                autoComplete="off"
                placeholder="johndoe@gmail.com"
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                autoComplete="off"
                placeholder="John"
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Doe"
                autoComplete="off"
                onChange={handleChange}
                className="form-control"
                required
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
              Create an account
            </button>
          </form>
        </div>
        <div>
          <div className="mt-10 text-center text-t-light dark:text-t-dark">
            Already have an account ?{" "}
            <Link
              to="/login"
              className="underline font-bold tracking-wide text-d-light"
            >
              Login here
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
