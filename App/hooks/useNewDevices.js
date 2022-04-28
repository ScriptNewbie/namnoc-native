import { useQuery } from "react-query";
import http from "../services/httpServiecs";

const fetchNewDevices = async () => {
  const { data } = await http.get("/newDevices");
  return data;
};

const useNewDevices = () =>
  useQuery("newDevices", fetchNewDevices, {
    refetchInterval: 1000,
  });
export default useNewDevices;
