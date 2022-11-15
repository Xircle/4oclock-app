import axios from "axios";
import storage from "./helpers/myAsyncStorage";
import { navigate } from "./RootNavigation";

const giveApiClient = async () => {
  const token = await storage.getItem("token");
  const targetApiClient = axios.create({
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token || ""}`,
    },
  });
  targetApiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response.status === 403 || error.response.status === 401) {
        console.log("hi");
        //await storage.clearItems();
        navigate("Welcome", {});
      }
    }
  );
  return targetApiClient;
};

export default giveApiClient;
