import { GetMyRooms, isUnreadMessageOutput } from "./types.d";
import AxiosClient from "../apiClient";
import { Alert } from "react-native";
import { BASE_URL } from "../utils";

export const isUnreadMessage = async (): Promise<isUnreadMessageOutput> => {
  const axiosclient = await AxiosClient();
  const { data } = await axiosclient.get<isUnreadMessageOutput>(
    `${BASE_URL}/room/unread`
  );
  if (!data.ok) {
    Alert.alert(data.error);
  }
  return data;
};
