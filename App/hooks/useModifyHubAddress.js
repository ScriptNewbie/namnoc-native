import { useMutation, useQueryClient } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const modifyCookie = (value) => {
  document.cookie = "hub=" + value;
  return true;
};

const useModifyHubAddress = (props) => {
  return useMutation(
    (value) => {
      if (Platform.OS === "web") return modifyCookie(value);
      return AsyncStorage.setItem("hubIp", value);
    },
    {
      onSuccess: props.onSuccess,
    }
  );
};
export default useModifyHubAddress;
