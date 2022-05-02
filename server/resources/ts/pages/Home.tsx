import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("user");

        // console.log(response);
        const user = response.data;

        setMessage(`Hi ${user.first_name} ${user.last_name}`);
      } catch (e) {
        setMessage("You are not logged in!");
      }
    })();
  }, []);

  return (
    <div className="container">
      <h1>
        {message}
      </h1>
    </div>
  );
};

export default Home;
