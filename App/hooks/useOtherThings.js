import { useQuery } from "react-query";
import http from "../services/httpServiecs";

const fetchOtherThings = async () => {
  const { data: mqttConnected } = await http.get("/mqttconnected");
  const { data: optionsSetByUser } = await http.get("/options/set");

  const otherThings = {
    mqttConnected: mqttConnected,
    optionsSetByUser: optionsSetByUser,
  };
  return otherThings;
};

const useOtherThings = () =>
  useQuery("otherThings", fetchOtherThings, {
    refetchInterval: 60000,
  });
export default useOtherThings;
