import axios from "axios";
import React, { SyntheticEvent, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

export const Reset = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { token } = useParams();

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post("reset", {
      token,
      password,
      password_confirm: passwordConfirm
    });

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <form className="form-signin" onSubmit={submit}>
      <h1 className="h3 mb-3 font-weight-normal">Reset your password</h1>

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
        required
        onChange={e => setPassword(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password Confirm"
        required
        onChange={e => setPasswordConfirm(e.target.value)}
      />

      <button className="btn btn-lg btn-primary btn-block w-100" type="submit">
        Reset Password
      </button>
    </form>
  );
};
