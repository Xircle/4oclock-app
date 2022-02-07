import { CreateActivityOutput } from "./types.d";
import AxiosClient from "../apiClient";
import { BASE_URL } from "../utils";
import { ActivityState } from "../activity/ActivityReducer";

const typeKoToEn = {
  정기: "Regular-meeting",
  이벤트: "Event",
  번개: "Lightning",
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
  formData.append("detailAddress", placeData.detailAddress);
  formData.append("description", placeData.description);
  formData.append("startDateAt", placeData.startDateAt + "");
  formData.append("participationFee", placeData.participationFee);
  formData.append("placeId", placeData.placeId);
  formData.append("isVaccinated", true);
  formData.append("placeType", typeKoToEn[placeData.activityType]);
  formData.append("kakaoLink", placeData.kakaoLink);
  if (typeKoToEn[placeData.activityType] === "Regular-meeting") {
    formData.append("team", placeData.team);
  }

  const { data } = await axiosclient.post<CreateActivityOutput>(
    `${BASE_URL}/place`,
    formData
  );
  return data;
};

// to be changed
