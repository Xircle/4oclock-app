import { CoreOutput } from "./types.d";
import AxiosClient from "../apiClient";
import { BASE_URL } from "../utils";

export const deletePlace = async (placeId: string): Promise<CoreOutput> => {
  const axiosclient = await AxiosClient();

  const { data } = await axiosclient.delete<CoreOutput>(
    `${BASE_URL}/place/${placeId}`
  );
  return data;
};
