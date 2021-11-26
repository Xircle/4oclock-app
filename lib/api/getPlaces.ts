import { GetPlacesByLocationOutput, PlaceFeedData } from "./types";
import AxiosClient from "../apiClient";
import storage from "../helpers/myAsyncStorage";
import { BASE_URL } from "../utils";

export type PlaceLocation = "전체" | "안암" | "신촌";

export const getPlacesForCarousel = async (
  selectedLocation: PlaceLocation,
  page: number = 1,
  limit: number = 10
): Promise<GetPlacesByLocationOutput | undefined> => {
  const axiosclient = await AxiosClient();
  const token = await storage.getItem("token");
  if (!token) return;
  const { data } = await axiosclient.get<GetPlacesByLocationOutput>(
    `${BASE_URL}/place?location=${selectedLocation}&page=${page}&limit=${limit}`,
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

export const getPlacesMain = async ({
  pageParam,
}): Promise<GetPlacesByLocationOutput | undefined> => {
  const axiosclient = await AxiosClient();
  const token = await storage.getItem("token");
  if (!token) return;
  const { data } = await axiosclient.get<GetPlacesByLocationOutput>(
    `${BASE_URL}/place?location=전체&page=${pageParam}&limit=10`,
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
