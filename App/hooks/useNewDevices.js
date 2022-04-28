import { useQuery } from "react-query";
import http from "../services/httpServiecs";

const fetchNewDevices = async () => {
  return await http.get("/newDevices");
};

const useNewDevices = () =>
  useQuery("newDevices", fetchNewDevices, {
    refetchInterval: 1000,
  });
export default useNewDevices;
