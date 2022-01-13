import { GetMyRooms } from "./types.d";
import AxiosClient from "../apiClient";
import { Alert } from "react-native";
import { BASE_URL } from "../utils";

export const getMyRooms = async (): Promise<GetMyRooms> => {
    const axiosclient = await AxiosClient();
  const { data } = await axiosclient.get<GetMyRooms>(`${BASE_URL}/room`);
  if (!data.ok) {
    Alert.alert(data.error);
  }
  return data;
};
