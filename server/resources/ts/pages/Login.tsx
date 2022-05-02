import axios from "axios";
import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Login = ({ setLogin }: { setLogin: Function }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post("login", {
      email,
      password
    });

    setRedirect(true);
    setLogin();
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <form className="form-signin" onSubmit={submit}>
      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

      <input
        type="email"
        className="form-control mb-2"
        placeholder="Email"
        required
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-2"
        placeholder="Password"
        required
        onChange={e => setPassword(e.target.value)}
      />

      <div className="mb-3">
        <Link to="/forgot">Forgot Password?</Link>
      </div>

      <button className="btn btn-lg btn-primary btn-block w-100" type="submit">
        Sign in
      </button>
    </form>
  );
};

export default Login;
