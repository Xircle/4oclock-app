import { CreateActivityOutput } from "./types.d";
import AxiosClient from "../apiClient";
import { BASE_URL } from "../utils";
import { ActivityState } from "../activity/ActivityReducer";

export const typeKoToEn = {
  정기: "Regular-meeting",
  이벤트: "Event",
  번개: "Lightning",
};
export const typeEnToKo = {
  "Regular-meeting": "정기",
  Event: "이벤트",
  Lightning: "번개",
};

export const createPlace = async (
  placeData: ActivityState
): Promise<CreateActivityOutput> => {
  const formData = new FormData();
  const axiosclient = await AxiosClient();

  formData.append("coverImage", placeData.coverImage!);

  if (placeData.subImages) {
    for (let i = 0; i < placeData.subImages.length; i++) {
      formData.append("subImages", placeData.subImages[i]!);
    }
  }
  formData.append("name", placeData.name);
  if (placeData.maxParticipantsNumber) {
    formData.append("maxParticipantsNumber", placeData.maxParticipantsNumber);
  }
  // BEGIN:for testing
  if (placeData.recommendation) {
    formData.append("recommendation", placeData.recommendation);
  }
  if (!placeData.participating)
    formData.append("notParticipating", !placeData.participating);
  // END
  formData.append("detailAddress", placeData.detailAddress);
  formData.append("description", placeData.description);
  formData.append("startDateAt", placeData.startDateAt + "");
  formData.append("participationFee", placeData.participationFee);
  formData.append("placeId", placeData.placeId);
  formData.append("placeType", typeKoToEn[placeData.activityType]);
  formData.append("kakaoLink", placeData.kakaoLink);
  if (placeData.qAndA?.length) {
    for (let i = 0; i < placeData.qAndA.length; i++) {
      formData.append("qAndA", placeData.qAndA[i]!);
    }
    formData.append("qAndA", "감사합니다");
  }

  const { data } = await axiosclient.post<CreateActivityOutput>(
    `${BASE_URL}/place`,
    formData
  );
  return data;
};

// to be changed
