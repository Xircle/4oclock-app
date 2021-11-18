import axios, { AxiosRequestConfig } from "axios";
import { getTOKEN, TOKEN } from "./utils";
import Realm from "realm";
import { UserSchema } from "./RealmDB";
import storage from "./helpers/myAsyncStorage";

// http://localhost:3080
const host =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PRODUCTION_API_SERVER
    : process.env.REACT_APP_PRODUCTION_API_SERVER;

const token = storage.getItem("token");


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
