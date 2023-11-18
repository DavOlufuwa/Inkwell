import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-[100svh]">
      <div>
        <h1>INKWELL</h1>
      </div>
      <section>
        <div>
          <form>
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
