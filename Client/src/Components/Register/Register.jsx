import React from "react";
import "./register.css";
import axios from "axios";
import userApi from "../../api/user.api";
import { useState } from "react";
// import icons
import { FaBookMedical } from "react-icons/fa";

const Register = () => {
  const [username, setUsername] = useState("");
  const [displayname, setDisplayname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = {
    username: (e) => {
      setUsername(e.target.value);
    },
    password: (e) => {
      setPassword(e.target.value);
    },
    confirmPassword: (e) => {
      setConfirmPassword(e.target.value);
    },
    displayname: (e) => {
      setDisplayname(e.target.value);
    },
  };

  const handleSubmit = async () => {
    try {
      const { response, err } = await axios.post(
        userApi.register(username, password, confirmPassword, displayname)
      );

      if (response) {
        console.log("OK");
      }

      if (err) {
      }
    } catch (error) {
      return { error };
    }
  };

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
          <input
            type="text"
            id="username"
            onChange={handleChange.username}
            placeholder="Dominic Huang"
          />
          <label for="displayname">displayname :</label>
          <input
            type="text"
            id="displayname"
            onChange={handleChange.displayname}
            placeholder="ET"
          />
          <label for="password">password :</label>
          <input
            type="text"
            id="password"
            onChange={handleChange.password}
            placeholder="Enter your password"
          />
          <label for="confirmPassword">confirmPassword :</label>
          <input
            type="text"
            id="confirmPassword"
            onChange={handleChange.confirmPassword}
            placeholder="Enter your password again"
          />
          <button className="submit btn" onSubmit={handleSubmit}>
            Submit
          </button>
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
