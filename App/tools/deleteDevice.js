import axios from "axios";

const deleteDevice = async (device, queryClient) => {
  try {
    const { data } = await axios.delete("http://zettawhit.com:8080/devices", {
      data: device,
    });
    queryClient.invalidateQueries();
  } catch (e) {
    console.log(e);
  }
};

export default deleteDevice;
