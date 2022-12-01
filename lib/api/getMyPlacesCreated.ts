import { GetMyCreatedPlaceOutput, MyCreatedPlaceData } from "./types.d";
import AxiosClient from "../apiClient";
import { Alert } from "react-native";
import { BASE_URL } from "../utils";

export const getMyPlacesCreated = async (): Promise<MyCreatedPlaceData[]> => {
  const axiosclient = await AxiosClient();
  const { data } = await axiosclient.get<GetMyCreatedPlaceOutput>(
    `${BASE_URL}/user/history/created`
  );
  if (!data.ok) {
    Alert.alert(data.error);
  }
  return data.places;
};
