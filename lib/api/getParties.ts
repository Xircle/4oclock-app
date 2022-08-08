import { GetPartiesOutput, PartyData } from "./types.d";
import AxiosClient from "../apiClient";
import { Alert } from "react-native";
import { BASE_URL } from "../utils";

export const getMyPlaces = async (): Promise<PartyData[]> => {
  const axiosclient = await AxiosClient();
  const { data } = await axiosclient.get<GetPartiesOutput>(
    `${BASE_URL}/party/`
  );
  if (!data.ok) {
    Alert.alert(data.error);
  }
  return data.parties;
};
