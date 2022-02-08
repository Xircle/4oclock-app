import { GetTeamsOutput } from "./types";
import AxiosClient from "../apiClient";
import storage from "../helpers/myAsyncStorage";
import { BASE_URL } from "../utils";
import { TeamData } from "./types.d";

export const getTeams = async (): Promise<TeamData[] | undefined> => {
  const axiosClient = await AxiosClient();
  const token = await storage.getItem("token");

  if (!token) return;

  const { data } = await axiosClient.get<GetTeamsOutput>(
    `${BASE_URL}/team/all`
  );
  if (!data.ok) {
    throw new Error(data.error);
  }
  //console.log(data);
  return data.teams;
};
