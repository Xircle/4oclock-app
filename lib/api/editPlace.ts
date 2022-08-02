import { ActivityState } from "./../activity/ActivityReducer";
import { CreateActivityOutput } from "./types.d";
import AxiosClient from "../apiClient";
import { BASE_URL } from "../utils";
import { typeKoToEn } from "./createPlace";

export const editPlace = async (
  placeData: ActivityState,
  placeId: string
): Promise<CreateActivityOutput> => {
  const formData = new FormData();
  const axiosclient = await AxiosClient();

  if (placeData.subImages) {
    for (let i = 0; i < placeData.subImages.length; i++) {
      formData.append("images", placeData.subImages[i]!);
    }
  }
  formData.append("name", placeData.name);
  formData.append("maxParticipantsNumber", placeData.maxParticipantsNumber);
  // BEGIN:for testing
  if (placeData.recommendation) {
    formData.append("recommendation", placeData.recommendation);
  }
  // END
  formData.append("detailAddress", placeData.detailAddress);
  formData.append("description", placeData.description);
  formData.append("startDateAt", placeData.startDateAt + "");
  formData.append("participationFee", placeData.participationFee);
  formData.append("placeId", placeData.placeId);
  formData.append("isVaccinated", true);
  formData.append("placeType", typeKoToEn[placeData.activityType]);
  formData.append("kakaoLink", placeData.kakaoLink);
  formData.append("isCoverImageDeleted", placeData.isCoverImageDeleted);
  if (placeData.modifySubImageUrls) {
    for (let i = 0; i < placeData.modifySubImageUrls.length; i++) {
      formData.append("oldSubImageUrls", placeData.modifySubImageUrls[i]!);
    }
  }
  formData.append(
    "oldCoverImageUrl",
    placeData.modifyCoverImageUrl ? placeData.modifyCoverImageUrl : ""
  );

  const { data } = await axiosclient.patch<CreateActivityOutput>(
    `${BASE_URL}/place/${placeId}`,
    formData
  );
  return data;
};
