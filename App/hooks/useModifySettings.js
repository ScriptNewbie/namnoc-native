import { useMutation, useQueryClient } from "react-query";
import http from "../services/httpServiecs";

const useModifySettings = (props = {}) => {
  const queryClient = useQueryClient();
  return useMutation(
    (settings) => {
      return http.put("/options", settings);
    },
    {
      ...props,
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries();
        if (props.onSuccess) props.onSuccess(data);
      },
      onError: () => {
        alert(
          "Nie udało się zmodyfikować ustawień! Sprawdź czy pola zostały wypełnione poprawnie!"
        );
      },
    }
  );
};
export default useModifySettings;
