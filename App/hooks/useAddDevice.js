import { useMutation, useQueryClient } from "react-query";
import http from "../services/httpServiecs";

const useAddDevice = (props = {}) => {
  const queryClient = useQueryClient();
  return useMutation(
    (device) => {
      return http.post("/devices", device);
    },
    {
      ...props,
      onSuccess: () => {
        queryClient.invalidateQueries();
        if (props.onSuccess) props.onSuccess();
      },
      onError: () => {
        alert(
          "Nie udało się dodać urządzenia! Sprawdź czy pola zostały wypełnione poprawnie!"
        );
      },
    }
  );
};
export default useAddDevice;
