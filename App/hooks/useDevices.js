import { useQuery } from "react-query";
import http from "../services/httpServiecs";

const fetchDevices = async () => {
  const { data } = await http.get("/devices");
  return data;
};

const useDevices = () =>
  useQuery("devices", fetchDevices, {
    refetchInterval: 5000,
  });
export default useDevices;
