import axios from "axios";
import storage from "./helpers/myAsyncStorage";

const giveApiClient = async () => {
  const token = await storage.getItem("token");
  const targetApiClient = axios.create({
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token || ""}`,
    },
  });

  return targetApiClient;
};

export default giveApiClient;
