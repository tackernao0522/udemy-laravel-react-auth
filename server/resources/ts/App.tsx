import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Forgot } from "./pages/Forgot";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Reset } from "./pages/Reset";

const App = () => {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(false);

  useEffect(
    () => {
      (async () => {
        try {
          const response = await axios.get("user");

          // console.log(response);
          const user = response.data;

          setUser(user);
        } catch (e) {
          setUser(null);
        }
      })();
    },
    [login]
  );

  return (
    <div className="App">
      <BrowserRouter>
        <Nav user={user} setLogin={() => setLogin(false)} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route
            path="/login"
            element={<Login setLogin={() => setLogin(true)} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/reset/:token" element={<Reset />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
