import { useMutation, useQueryClient } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useModifyHubAddress = () => {
  return useMutation((value) => {
    return AsyncStorage.setItem("hubIp", value);
  });
};
export default useModifyHubAddress;
