import { useQuery } from "react-query";
import http from "../services/httpServiecs";

const fetchSettings = async () => {
  const { data } = await http.get("/options");
  return data;
};

const useSettings = () =>
  useQuery("settings", fetchSettings, {
    refetchInterval: false,
  });
export default useSettings;
