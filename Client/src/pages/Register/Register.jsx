import React, { useState } from "react";
import "./register.scss";
import userApi from "../../api/user.api";
import { setUser } from "../../redux/slices/user.slice";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
// import icons
import { FaBookMedical } from "react-icons/fa";

const Register = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState("");

  const registerForm = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      displayname: "",
    },
    ValidationSchema: Yup.object({
      username: Yup.string()
        .min("username minimum 8 character")
        .required("Username can not be empty"),
      password: Yup.string()
        .min("username minimum 8 character")
        .required("Username can not be empty"),
      confirmPassword: Yup.string()
        .min("username minimum 8 character")
        .required("Username can not be empty"),
      displayname: Yup.string()
        .min("username minimum 8 character")
        .required("Username can not be empty"),
    }),
    onSubmit: async (values) => {
      const { response, err } = await userApi.register(values);
      if (response) {
        registerForm.resetForm();
        dispatch(setUser(response));
        console.log("OK");
        Navigate("/");
      }

      if (err) setErrorMessage(err.message);
    },
  });

  return (
    <section className="registerSection section container flex">
      <div className="text">
        <h2>🕺 FormatHolic ⛹️‍♂️</h2>
        <p>Perfect to format your idea</p>
      </div>

      <div className="register container flex">
        <h2>Register</h2>
        <form
          id="form"
          className="form flex"
          onSubmit={registerForm.handleSubmit}
        >
          <label for="username">username :</label>
          <input
            type="text"
            id="username"
            onChange={registerForm.handleChange}
            value={registerForm.values.username}
            placeholder="Dominic Huang"
          />
          <label for="displayname">displayname :</label>
          <input
            type="text"
            id="displayname"
            onChange={registerForm.handleChange}
            value={registerForm.values.displayname}
            placeholder="ET"
          />
          <label for="password">password :</label>
          <input
            type="password"
            id="password"
            onChange={registerForm.handleChange}
            value={registerForm.values.password}
            placeholder="Enter your password"
          />
          <label for="confirmPassword">confirmPassword :</label>
          <input
            type="text"
            id="confirmPassword"
            onChange={registerForm.handleChange}
            value={registerForm.values.confirmPassword}
            placeholder="Enter your password again"
          />

          {errorMessage && (
            <div>
              <h5>{errorMessage}</h5>
            </div>
          )}

          <button className="submit btn" type="submit">
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
