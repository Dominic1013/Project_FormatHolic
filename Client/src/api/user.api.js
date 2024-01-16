import axios from "axios";
import publicClient from "./public.client";

const userEndpoints = {
  register: "/register",
  login: "/login",
};

const userApi = {
  register: async ({ username, password, displayname, confirmPassword }) => {
    try {
      const response = await publicClient.post(userEndpoints.register, {
        username,
        password,
        displayname,
        confirmPassword,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },

  login: async ({ username, password }) => {
    try {
      const response = await publicClient.post(userEndpoints.login, {
        username,
        password,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default userApi;
