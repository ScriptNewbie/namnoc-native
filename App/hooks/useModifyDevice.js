import { useMutation, useQueryClient } from "react-query";
import http from "../services/httpServiecs";

const useModifyDevice = (props = {}) => {
  const queryClient = useQueryClient();
  return useMutation(
    (device) => {
      return http.put("/devices", device);
    },
    {
      ...props,
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries();
        if (props.onSuccess) props.onSuccess(data);
      },
      onError: () => {
        alert(
          "Nie udało się zmodyfikować urządzenia! Sprawdź czy pola zostały wypełnione poprawnie!"
        );
      },
    }
  );
};
export default useModifyDevice;
