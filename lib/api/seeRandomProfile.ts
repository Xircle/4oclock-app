import { UserProfile, SeeRandomProfile } from "./types.d";
import AxiosClient from "../apiClient";
import { BASE_URL } from "../utils";

export const seeRandomProfile = async (
  isYkClub: boolean
): Promise<UserProfile | undefined> => {
  try {
    const axiosclient = await AxiosClient();
    const { data } = await axiosclient.get<SeeRandomProfile>(
      `${BASE_URL}/user/profile/random?ykClubOnly=${isYkClub}`,
      {
        timeout: 6000,
      }
    );
    if (!data.ok) {
      console.log(data);
      throw new Error(data.error);
    }
    return data.randomProfile;
  } catch (err) {
    console.log(err);
    throw new Error("일시적인 에러가 발생했습니다.");
  }
};
