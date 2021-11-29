import { GetPlaceByIdOutput, PlaceData } from "./types.d";
import AxiosClient from "../apiClient";
import storage from "../helpers/myAsyncStorage";
import { BASE_URL } from "../utils";

export const getPlaceById = async (placeId: string): Promise<PlaceData> => {
  const axiosclient = await AxiosClient();
  const token = await storage.getItem("token");
  const { data } = await axiosclient.get<GetPlaceByIdOutput>(
    `${BASE_URL}/place/${placeId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!data.ok) {
    throw new Error(data.error);
  }
  return data.placeData;
};
