import { useState } from "react";
import { Link , useNavigate , useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../routes/authRequests";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const newUserMutation = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      window.alert("new user created");
      setCredentials({
        email: "",
        firstname: "",
        lastname: "",
        password: "",
      });
      navigate(from, { replace: true });
    },
    onError: () => {
      window.alert("error creating new user");
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
    <div className="min-h-[100svh]">
      <div>
        <h1>INKWELL</h1>
      </div>
      <section>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="johndoe@gmail.com"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="John"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Doe"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="border">
              Create an account
            </button>
          </form>
        </div>
        <div>
          <div className="mt-10 text-sm text-center">
            Already have an account ?{" "}
            <Link to="/login" className="underline font-semibold">
              Login here
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
