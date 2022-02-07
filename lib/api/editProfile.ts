import { CreateAccountOutput } from "./types";
import AxiosClient from "../apiClient";
import { CoreOutput } from "./types";
import { EditProfileData } from "../../screens/MyPage/MyProfile";
import { AxiosResponse } from "axios";
import { BASE_URL } from "../utils";

export const editProfile = async (
  editedProfileData: EditProfileData
): Promise<AxiosResponse<CoreOutput>> => {
  const formData = new FormData();
  const axiosclient = await AxiosClient();

  editedProfileData.profileImageFile &&
    formData.append("profileImageFile", editedProfileData.profileImageFile);
  editedProfileData.username &&
    formData.append("username", editedProfileData.username);
  editedProfileData.shortBio &&
    formData.append("shortBio", editedProfileData.shortBio);
  editedProfileData.job && formData.append("job", editedProfileData.job);
  editedProfileData.activities &&
    formData.append("activities", editedProfileData.activities);
  if (typeof editedProfileData.isYkClub === "boolean") {
    formData.append("isYkClub", String(editedProfileData.isYkClub));
  }

  // for testing
  if (
    editedProfileData.team &&
    editedProfileData.team !== "팀을 선택해주세요"
  ) {
    formData.append("team", editedProfileData.team);
  }

  editedProfileData.MBTI && formData.append("MBTI", editedProfileData.MBTI);
  editedProfileData.personality &&
    formData.append("personality", editedProfileData.personality);
  (editedProfileData.drinkingStyle || editedProfileData.drinkingStyle === 0) &&
    formData.append("drinkingStyle", editedProfileData.drinkingStyle + "");
  console.log(editedProfileData.code);
  return axiosclient.put<CreateAccountOutput>(
    editedProfileData.code
      ? `${BASE_URL}/user?code=${editedProfileData.code}`
      : `${BASE_URL}/user`,
    formData
  );
};
