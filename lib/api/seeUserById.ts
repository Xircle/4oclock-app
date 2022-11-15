import { SeeUserByIdOutput, UserProfile } from "./types.d";
import AxiosClient from "../apiClient";
import { BASE_URL } from "../utils";

export const seeUserById = async (
  id: string
): Promise<UserProfile | undefined> => {
  const axiosclient = await AxiosClient();
  const { data } = await axiosclient.get<SeeUserByIdOutput>(
    `${BASE_URL}/user/profile/${id}`,
    {
      timeout: 6000,
    }
  );
  if (!data.ok) {
    throw new Error(data.error);
  }
  return data.user;
};
