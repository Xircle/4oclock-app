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
    `${BASE_URL}/place?location=${selectedLocation}&page=${page}&limit=${limit}&placeType=All`,
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

export const getPlacesRegular = async ({
  pageParam,
}): Promise<GetPlacesByLocationOutput | undefined> => {
  const axiosclient = await AxiosClient();
  const token = await storage.getItem("token");
  const team = await storage.getItem("team");
  if (!token) return;
  const { data } = await axiosclient.get<GetPlacesByLocationOutput>(
    team
      ? `${BASE_URL}/place?location=전체&page=${pageParam}&limit=5&placeType=Regular-meeting&team=${team}`
      : `${BASE_URL}/place?location=전체&page=${pageParam}&limit=5&placeType=Regular-meeting`,
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

export const getPlacesAll = async ({
  pageParam,
}): Promise<GetPlacesByLocationOutput | undefined> => {
  const axiosclient = await AxiosClient();
  const token = await storage.getItem("token");
  if (!token) return;
  const { data } = await axiosclient.get<GetPlacesByLocationOutput>(
    `${BASE_URL}/place?location=전체&page=${pageParam}&limit=5&placeType=All`,
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

export const getPlacesEvent = async ({
  pageParam,
}): Promise<GetPlacesByLocationOutput | undefined> => {
  const axiosclient = await AxiosClient();
  const token = await storage.getItem("token");
  if (!token) return;
  const { data } = await axiosclient.get<GetPlacesByLocationOutput>(
    `${BASE_URL}/place?location=전체&page=${pageParam}&limit=5&placeType=Event`,
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

export const getPlacesLightning = async ({
  pageParam,
}): Promise<GetPlacesByLocationOutput | undefined> => {
  const axiosclient = await AxiosClient();
  const token = await storage.getItem("token");
  if (!token) return;
  const { data } = await axiosclient.get<GetPlacesByLocationOutput>(
    `${BASE_URL}/place?location=전체&page=${pageParam}&limit=5&placeType=Lightning`,
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

// to be changed
