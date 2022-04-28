import axios from "axios";

const baseUrl = "http://zettawhit.com:8080";

const http = {
  get: async (resource) => {
    const response = await axios.get(baseUrl + resource);
    return response;
  },
  post: async (resource, data) => {
    const response = await axios.post(baseUrl + resource, data);
    return response;
  },
  delete: async (resource, data) => {
    const response = await axios.delete(baseUrl + resource, {
      data,
    });
    return response;
  },
};

export default http;
