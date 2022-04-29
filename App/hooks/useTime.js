import { useQuery } from "react-query";
import http from "../services/httpServiecs";

const fetchTime = async () => {
  const { data } = await http.get("/time");
  return data;
};

const useTime = () =>
  useQuery("time", fetchTime, {
    refetchInterval: 5000,
  });
export default useTime;
