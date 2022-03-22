import { GetEventBannersOutput } from "./types.d";
import { BASE_URL } from "./../utils";
import AxiosClient from "../apiClient";

export const getEventBanners = async (): Promise<
  GetEventBannersOutput | undefined
> => {
  const axiosclient = await AxiosClient();

  const { data } = await axiosclient.get<GetEventBannersOutput>(
    `${BASE_URL}/event/banner/many`
  );
  if (!data.ok) {
    throw new Error(data.error);
  }
  return data;
};
