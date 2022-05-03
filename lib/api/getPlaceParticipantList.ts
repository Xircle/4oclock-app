import AxiosClient from "../apiClient";
import { BASE_URL } from "../utils";
import {
  GetPlaceParticipantListOutput,
  PlaceParticipantListData,
} from "./types";

export const getPlaceParticipantList = async (
  placeId: string
): Promise<PlaceParticipantListData> => {
  const axiosclient = await AxiosClient();
  const { data } = await axiosclient.get<GetPlaceParticipantListOutput>(
    `${BASE_URL}/place/${placeId}/participants`
  );
  if (!data.participants) {
    throw new Error();
  }
  return data.participants;
};
