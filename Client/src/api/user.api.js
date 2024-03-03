import publicClient from "./public.client";

const userEndpoints = {
  register: "user/register",
  login: "user/login",
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
