import { GetPlacesByLocationOutput, PlaceFeedData } from "./types.d";
import AxiosClient from "../apiClient";
import storage from "../helpers/myAsyncStorage";

export type PlaceLocation = "전체" | "안암" | "신촌";

export const getPlacesByLocation = async (
  selectedLocation: PlaceLocation,
  page: number = 1,
  limit: number = 10
): Promise<GetPlacesByLocationOutput | undefined> => {
  const axiosclient = await AxiosClient();
  const token = await storage.getItem("token");
  if (!token) return;
  const { data } = await axiosclient.get<GetPlacesByLocationOutput>(
    `/place?location=${selectedLocation}&page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!data.ok) {
    throw new Error(data.error);
  }
  return data;
};
