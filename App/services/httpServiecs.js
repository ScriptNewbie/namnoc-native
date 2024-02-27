import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const getHubAddress = async () => {
  try {
    const address = await AsyncStorage.getItem("hubIp");
    return address ? address : "http://192.168.120.155:8080";
  } catch (e) {
    return "http://192.168.120.155:8080";
  }
};

const http = {
  get: async (resource) => {
    const baseUrl = await getHubAddress();
    const response = await axios.get(baseUrl + resource);
    return response;
  },
  post: async (resource, data) => {
    const baseUrl = await getHubAddress();
    const response = await axios.post(baseUrl + resource, data);
    return response;
  },
  put: async (resource, data) => {
    const baseUrl = await getHubAddress();
    const response = await axios.put(baseUrl + resource, data);
    return response;
  },
  delete: async (resource, data) => {
    const baseUrl = await getHubAddress();
    const response = await axios.delete(baseUrl + resource, {
      data,
    });
    return response;
  },
};

export default http;
