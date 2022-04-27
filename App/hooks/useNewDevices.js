import { useQuery } from "react-query";
import axios from "axios";

const fetchNewDevices = async () => {
  const { data } = await axios.get("http://zettawhit.com:8080/newDevices");
  return data;
};

const useNewDevices = () =>
  useQuery("newDevices", fetchNewDevices, {
    refetchInterval: 1000,
  });
export default useNewDevices;
