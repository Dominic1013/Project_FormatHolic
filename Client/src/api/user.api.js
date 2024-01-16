import axios from "axios";
const API_URL = "http://localhost:5000/api/user";

const userEndpoints = {
  register: "/register",
  login: "/login",
};

const userApi = {
  register: (username, password, displayname, confirmPassword) => {
    return axios.post(API_URL + userEndpoints.register, {
      username,
      password,
      displayname,
      confirmPassword,
    });
  },

  login: (username, password) => {
    return axios.post(API_URL + userEndpoints.login, { username, password });
  },
};

export default userApi;
