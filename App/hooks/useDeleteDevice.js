import { useMutation, useQueryClient } from "react-query";
import http from "../services/httpServiecs";

const useDeleteDevices = (props = {}) => {
  const queryClient = useQueryClient();
  return useMutation(
    (device) => {
      return http.delete("/devices", device);
    },
    {
      ...props,
      onSuccess: () => {
        queryClient.invalidateQueries();
        if (props.onSuccess) props.onSuccess();
      },
      onError: () => {
        alert("Nie udało się usunąć urządzenia!");
      },
    }
  );
};
export default useDeleteDevices;
