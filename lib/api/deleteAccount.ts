import { CoreOutput } from "./types.d";
import AxiosClient from "../apiClient";
import { BASE_URL } from "../utils";

export const deleteAccount = async (): Promise<CoreOutput> => {
  const axiosclient = await AxiosClient();

  const { data } = await axiosclient.delete<CoreOutput>(
    `${BASE_URL}/user/delete`
  );
  return data;
};
