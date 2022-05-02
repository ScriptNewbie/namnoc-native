import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const cookie =
  Platform.OS === "web" &&
  document.cookie &&
  document.cookie.startsWith("hub=http")
    ? document.cookie.substring(4)
    : "http://192.168.120.155:8080";
const hubAddress =
  Platform.OS === "web" ? cookie : AsyncStorage.getItem("hubIp");

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
