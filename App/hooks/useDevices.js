import { useQuery } from "react-query";
import http from "../services/httpServiecs";

const fetchDevices = async () => {
  return await http.get("/devices");
};

const useDevices = () =>
  useQuery("devices", fetchDevices, {
    refetchInterval: 1000,
  });
export default useDevices;
