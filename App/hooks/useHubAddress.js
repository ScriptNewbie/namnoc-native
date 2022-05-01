import { useQuery } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const getHubAddress = async () => {
  const value =
    Platform.OS === "web"
      ? document.cookie
      : await AsyncStorage.getItem("hubIp");
  if (value) {
    return value;
  }
  return "http://192.168.120.155:8080";
};

const useHubAddress = () =>
  useQuery("hubIp", getHubAddress, {
    refetchInterval: false,
  });
export default useHubAddress;
