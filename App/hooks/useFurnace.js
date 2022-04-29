import { useQuery } from "react-query";
import http from "../services/httpServiecs";

const fetchFurnace = async () => {
  const { data } = await http.get("/furnace");
  return data;
};

const useFurnace = () =>
  useQuery("settings", fetchFurnace, {
    refetchInterval: 5000,
  });
export default useFurnace;
