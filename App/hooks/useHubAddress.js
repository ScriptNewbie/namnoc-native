import { useQuery } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const getHubAddress = async () => {
  const value =
    Platform.OS === "web"
      ? document.cookie.substring(4)
      : await AsyncStorage.getItem("hubIp");
  if (value) {
    return value;
  }
  return "http://";
};

const useHubAddress = () =>
  useQuery("hubIp", getHubAddress, {
    refetchInterval: false,
  });
export default useHubAddress;
