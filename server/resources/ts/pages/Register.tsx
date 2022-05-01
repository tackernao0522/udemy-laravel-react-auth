import React, { SyntheticEvent, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post("register", {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      password_confirm: passwordConfirm
    });

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <form className="form-signin" onSubmit={submit}>
      <h1 className="h3 mb-3 font-weight-normal">Please register</h1>

      <input
        className="form-control mb-2"
        placeholder="First Name"
        required
        onChange={e => setFirstName(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Last Name"
        required
        onChange={e => setLastName(e.target.value)}
      />

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

      <input
        type="password"
        className="form-control mb-2"
        placeholder="Password Confirm"
        required
        onChange={e => setPasswordConfirm(e.target.value)}
      />

      <button className="btn btn-lg btn-primary btn-block w-100" type="submit">
        Register
      </button>
    </form>
  );
};

export default Register;
