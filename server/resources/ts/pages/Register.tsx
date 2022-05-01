import React from "react";

const Register = () => {
  return (
    <form className="form-signin">
      <h1 className="h3 mb-3 font-weight-normal">Please register</h1>

      <input className="form-control mb-2" placeholder="First Name" required />

      <input className="form-control mb-2" placeholder="Last Name" required />

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

      <input
        type="password"
        className="form-control mb-2"
        placeholder="Password Confirm"
        required
      />

      <button className="btn btn-lg btn-primary btn-block w-100" type="submit">
        Regitster
      </button>
    </form>
  );
};

export default Register;
