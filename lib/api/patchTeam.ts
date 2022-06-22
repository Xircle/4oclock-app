import { CoreOutput } from "./types.d";
import AxiosClient from "../apiClient";
import { BASE_URL } from "../utils";

export const patchTeam = async (teamId: string): Promise<CoreOutput> => {
  const axiosclient = await AxiosClient();

  const { data } = await axiosclient.patch<CoreOutput>(
    `${BASE_URL}/user/me/team/${teamId}`
  );
  return data;
};
