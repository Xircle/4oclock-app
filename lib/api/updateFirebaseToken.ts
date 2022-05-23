import { CoreOutput } from "./types.d";
import AxiosClient from "../apiClient";
import { BASE_URL } from "../utils";

export const updateFirebaseToken = async (
  token: string
): Promise<CoreOutput> => {
  const axiosclient = await AxiosClient();

  const { data } = await axiosclient.post<CoreOutput>(
    `${BASE_URL}/user/fbtoken/${token}`
  );
  return data;
};
