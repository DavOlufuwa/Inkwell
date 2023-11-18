import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../routes/authRequests";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      setCredentials({
        email: "",
        password: "",
      })
      navigate(from, { replace: true });
    }
  })

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(credentials);
  }

  return (
    <div className="min-h-[100svh]">
      <div>
        <h1>INKWELL</h1>
      </div>
      <section>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                required
                onChange={handleChange}
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
            <button type="submit">Login</button>
          </form>
        </div>
        <div>
          <div className="mt-10 text-sm text-center">
            Don't have an account ?{" "}
            <Link
              to="/signup"
              className="underline text-c-others font-semibold"
            >
              create one here
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
