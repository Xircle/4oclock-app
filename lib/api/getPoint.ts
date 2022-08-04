import { GetPointOutput, PointData } from "./types.d";
import AxiosClient from "../apiClient";
import { BASE_URL } from "../utils";

export const getPoint = async (): Promise<PointData> => {
  const axiosclient = await AxiosClient();
  const { data } = await axiosclient.get<GetPointOutput>(
    `${BASE_URL}/user/point`
  );
  if (!data.ok) {
    throw new Error(data.error);
  }
  return data.data;
};
