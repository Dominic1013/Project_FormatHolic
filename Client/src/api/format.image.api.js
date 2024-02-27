import privateClient from "./private.client";

const formatImageEndpoints = {
  add: "formatimage/add",
  getFormat: "formatimage/get",
};

const formatImageApi = {
  add: async (formatImageUrl) => {
    try {
      const response = await privateClient.post(formatImageEndpoints.add, {
        formatImageUrl,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },

  getFormat: async () => {
    try {
      const response = await privateClient.get(formatImageEndpoints.getFormat);
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default formatImageApi;
