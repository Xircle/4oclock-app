import { CoreOutput } from "./types.d";
import AxiosClient from "../apiClient";
import { AuthState } from "../../components/auth/types";
import { BASE_URL } from "../utils";

export const deleteAccount = async (): Promise<CoreOutput> => {
  const formData = new FormData();
  const axiosclient = await AxiosClient();

  const { data } = await axiosclient.delete<CoreOutput>(
    `${BASE_URL}/user/delete`
  );
  return data;
};
