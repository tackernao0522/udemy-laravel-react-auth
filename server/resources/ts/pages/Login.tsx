import React from "react";

const Login = () => {
  return (
    <form className="form-signin">
      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

      <input
        type="email"
        className="form-control mb-2"
        placeholder="Email"
        required
      />

      <input
        type="password"
        className="form-control mb-2"
        placeholder="Password"
        required
      />

      <button className="btn btn-lg btn-primary btn-block w-100" type="submit">
        Sign in
      </button>
    </form>
  );
};

export default Login;
