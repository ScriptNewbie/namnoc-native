import http from "../services/httpServiecs";

const deleteDevice = async (device, queryClient) => {
  try {
    const response = await http.delete("/devices", device);
    queryClient.invalidateQueries();
  } catch (e) {
    console.log(e);
  }
};

export default deleteDevice;
