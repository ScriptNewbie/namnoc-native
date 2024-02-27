import { useMutation, useQueryClient } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useModifyHubAddress = (props) => {
  return useMutation(
    (value) => {
      return AsyncStorage.setItem("hubIp", value);
    },
    {
      onSuccess: props.onSuccess,
    }
  );
};
export default useModifyHubAddress;
