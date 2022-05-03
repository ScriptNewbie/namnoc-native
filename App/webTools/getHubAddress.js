import axios from "axios";

const getHubAddress = async () => {
  if (
    document.cookie &&
    (document.cookie.startsWith("hub=http://") ||
      document.cookie.startsWith("hub=https://"))
  )
    return document.cookie.substring(4);
  try {
    const response = await axios.get("/hubAddress.json");
    return response.data.hub;
  } catch (e) {
    return "http://192.168.120.155:8080";
  }
};

export default getHubAddress;
