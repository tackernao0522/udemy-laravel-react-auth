import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

axios.defaults.baseURL = "http://localhost/api/";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("app")
);
