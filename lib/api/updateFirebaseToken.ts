import { CoreOutput } from "./types.d";
import AxiosClient from "../apiClient";
import { BASE_URL } from "../utils";
import storage from "../helpers/myAsyncStorage";

export const updateFirebaseToken = async (
  token: string
): Promise<CoreOutput> => {
  const userToken = await storage.getItem("token");
  if (!userToken) {
    return { ok: false, error: "no userToken. Which is fine" };
  }
  const axiosclient = await AxiosClient();

  const { data } = await axiosclient.post<CoreOutput>(
    `${BASE_URL}/user/fbtoken/${token}`
  );
  return data;
};
