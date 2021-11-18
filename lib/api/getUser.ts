import { GetUserOutput, UserData } from "./types.d";
import AxiosClient from "../apiClient";
import { Alert } from "react-native";
import { BASE_URL } from "../utils";

export const getUser = async (): Promise<UserData> => {
  const axiosclient = await AxiosClient();
  const { data } = await axiosclient.get<GetUserOutput>(`${BASE_URL}/user/me`);
  if (!data.ok) {
    Alert.alert(data.error);
  }
  return data.data;
};
