import React, { useState } from "react";
import "./login.css";
import userApi from "../../api/user.api";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

// import icons
import { FaBookMedical } from "react-icons/fa";

const Login = () => {
  const Navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const loginFrom = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    ValidationSchema: Yup.object({
      username: Yup.string()
        .min("username minimum 8 character")
        .required("Username can not be empty"),
      password: Yup.string()
        .min("username minimum 8 character")
        .required("Username can not be empty"),
    }),
    onSubmit: async (values) => {
      const { response, err } = await userApi.login(values);

      if (response) {
        loginFrom.resetForm();
        console.log("OK");
        Navigate("/");
      }

      if (err) setErrorMessage(err.message);
    },
  });

  return (
    <section className="loginSection section container flex">
      <div className="text">
        <h2>🕺 FormatHolic ⛹️‍♂️</h2>
        <p>Perfect to format your idea</p>
      </div>

      <div className="login container flex">
        <h2>Login</h2>
        <form id="form" className="form flex" onSubmit={loginFrom.handleSubmit}>
          <label for="username">username :</label>
          <input
            type="text"
            id="username"
            placeholder="Dominic Huang"
            onChange={loginFrom.handleChange}
          />
          <label for="password">password :</label>
          <input
            type="text"
            id="password"
            placeholder="Enter your password"
            onChange={loginFrom.handleChange}
          />

          <button className="submit btn">Submit</button>
        </form>

        {errorMessage && (
          <div>
            <h5>{errorMessage}</h5>
          </div>
        )}
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
