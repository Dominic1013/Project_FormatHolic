import React from "react";
import "./register.css";
// import icons
import { FaBookMedical } from "react-icons/fa";

const Register = () => {
  return (
    <section className="registerSection section container flex">
      <div className="text">
        <h2>🕺 FormatHolic ⛹️‍♂️</h2>
        <p>Perfect to format your idea</p>
      </div>

      <div className="register container flex">
        <h2>Register</h2>
        <form id="form" className="form flex">
          <label for="username">username :</label>
          <input type="text" id="username" placeholder="Dominic Huang" />
          <label for="displayname">displayname :</label>
          <input type="text" id="displayname" placeholder="ET" />
          <label for="password">password :</label>
          <input type="text" id="password" placeholder="Enter your password" />
          <label for="confirmPassword">confirmPassword :</label>
          <input
            type="text"
            id="confirmPassword"
            placeholder="Enter your password again"
          />
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

export default Register;
