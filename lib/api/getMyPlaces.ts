import { GetMyPlaceOutput, MyPlaceData } from "./types.d";
import AxiosClient from "../apiClient";
import { Alert } from "react-native";
import { BASE_URL } from "../utils";

export const getMyPlaces = async (): Promise<MyPlaceData[]> => {
  const axiosclient = await AxiosClient();
  const { data } = await axiosclient.get<GetMyPlaceOutput>(
    `${BASE_URL}/user/history`
  );
  if (!data.ok) {
    Alert.alert(data.error);
  }
  return data.places;
};
