import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

let hubAddress = AsyncStorage.getItem("hubIp");

const http = {
  get: async (resource) => {
    const baseUrl = await hubAddress;
    const response = await axios.get(baseUrl + resource);
    return response;
  },
  post: async (resource, data) => {
    const baseUrl = await hubAddress;
    const response = await axios.post(baseUrl + resource, data);
    return response;
  },
  put: async (resource, data) => {
    const baseUrl = await hubAddress;
    const response = await axios.put(baseUrl + resource, data);
    return response;
  },
  delete: async (resource, data) => {
    const baseUrl = await hubAddress;
    const response = await axios.delete(baseUrl + resource, {
      data,
    });
    return response;
  },
};

export default http;
