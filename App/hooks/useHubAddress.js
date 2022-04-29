import { useQuery } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getHubAddress = async () => {
  const value = await AsyncStorage.getItem("hubIp");
  if (value !== null) {
    return value;
  }
  return "http://127.0.0.1:8080";
};

const useHubAddress = () =>
  useQuery("hubIp", getHubAddress, {
    refetchInterval: false,
  });
export default useHubAddress;
