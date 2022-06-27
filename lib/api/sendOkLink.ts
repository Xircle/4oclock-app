import { CoreOutput } from "./types.d";
import AxiosClient from "../apiClient";
import { BASE_URL } from "../utils";

export const getPlaceById = async (
  placeId: string,
  receiverId: string
): Promise<CoreOutput> => {
  const axiosclient = await AxiosClient();
  const { data } = await axiosclient.get<CoreOutput>(
    `${BASE_URL}/place/sendOkLink/${placeId}/${receiverId}`
  );
  if (!data.ok) {
    throw new Error(data.error);
  }
  return data;
};
