import { GetPlaceByIdOutput, GetVersionOutput, PlaceData } from "./types.d";
import AxiosClient from "../apiClient";
import { BASE_URL } from "../utils";

export const getVersion = async (): Promise<GetVersionOutput> => {
  const axiosclient = await AxiosClient();
  const { data } = await axiosclient.get<GetVersionOutput>(
    `${BASE_URL}/version`
  );

  return data;
};
