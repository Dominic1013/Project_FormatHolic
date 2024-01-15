import React from "react";
import "./login.css";

// import icons
import { FaBookMedical } from "react-icons/fa";

const Login = () => {
  return (
    <section className="loginSection section container flex">
      <div className="text">
        <h2>🕺 FormatHolic ⛹️‍♂️</h2>
        <p>Perfect to format your idea</p>
      </div>

      <div className="login container flex">
        <h2>Login</h2>
        <form id="form" className="form flex">
          <label for="username">username :</label>
          <input type="text" id="username" placeholder="Dominic Huang" />
          <label for="displayname">displayname :</label>
          <input type="text" id="displayname" placeholder="ET" />
          <label for="password">password :</label>
          <input type="text" id="password" placeholder="Enter your password" />

          <button className="submit btn">Submit</button>
        </form>
      </div>

      <button className="howToUse btn flex">
        <a href="#">
          How To Use <FaBookMedical className="icon" />
        </a>
      </button>
    </section>
  );
};

export default Login;
