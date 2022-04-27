import { useQuery } from "react-query";
import axios from "axios";

const fetchDevices = async () => {
  const { data } = await axios.get("http://zettawhit.com:8080/devices");
  return data;
};

const useDevices = () =>
  useQuery("devices", fetchDevices, {
    refetchInterval: 1000,
  });
export default useDevices;
