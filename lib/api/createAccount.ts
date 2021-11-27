import { CreateAccountOutput } from "./types.d";
import AxiosClient from "../apiClient";
import { AuthState } from "../../components/auth/types";
import { BASE_URL } from "../utils";

export const createAccount = async (
  state: AuthState
): Promise<CreateAccountOutput> => {
  const formData = new FormData();
  const axiosclient = await AxiosClient();
  console.log(state.profileImgFile);
  state.profileImgFile
    ? formData.append("profileImageFile", state.profileImgFile!)
    : formData.append("profileImageUrl", state.profileImgUrl!);
  formData.append("socialId", state.uid + "");
  formData.append("email", state.email);
  formData.append("phoneNumber", state.phoneNumber);
  formData.append("username", state.name);
  formData.append("university", state.university);
  formData.append("isGraduate", state.isGraduate + "");
  formData.append("age", state.age);
  formData.append("gender", state.gender === "male" ? "Male" : "Female");
  formData.append("job", state.title);
  formData.append("shortBio", state.bio);
  formData.append("location", state.location + "");
  formData.append("isMarketingAgree", state.agree4 + "");
  formData.append("MBTI", state.MBTI);
    formData.append("personality", state.personality);
  formData.append("drinkingStyle", state.drinkingStyle + "");
  console.log("2");
  const { data } = await axiosclient.post<CreateAccountOutput>(
    `${BASE_URL}/auth/social/register/kakao`,
    formData
  );
  console.log("done");
  return data;
};