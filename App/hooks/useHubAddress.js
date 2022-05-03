import { useQuery } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

import getHubAddressForWeb from "../webTools/getHubAddress";

const getHubAddress = async () => {
  const value =
    Platform.OS === "web"
      ? await getHubAddressForWeb()
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
