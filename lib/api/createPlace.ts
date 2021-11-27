import { CreatePlaceOutput, CreatePlaceData } from "./types.d";
import AxiosClient from "../apiClient";
import { BASE_URL } from "../utils";

export const createPlace = async (
  placeData: CreatePlaceData
): Promise<CreatePlaceOutput> => {
  const formData = new FormData();
  const axiosclient = await AxiosClient();

  formData.append("coverImage", placeData.coverImageFile!);

  if (placeData.reviewImagesFile) {
    for (let i = 0; i < placeData.reviewImagesFile.length; i++) {
      formData.append("reviewImages", placeData.reviewImagesFile[i]!);
    }
  }
  formData.append("reviewDescription", placeData.reviewDescription);
  formData.append("name", placeData.name);
  formData.append("isLightning", placeData.isLightning + "");
  if (placeData.maxParticipantsNumber)
    formData.append("maxParticipantsNumber", placeData.maxParticipantsNumber);
  formData.append("location", placeData.location);
  formData.append("detailLink", placeData.detailLink);
  formData.append("detailAddress", placeData.detailAddress);

  formData.append("categories", JSON.stringify(placeData.categories));
  formData.append("description", placeData.description);
  formData.append("title", placeData.title);
  formData.append("startTime", placeData.startTime);
  formData.append("startDateAt", placeData.startDateAt + "");
  formData.append("recommendation", placeData.recommendation);
  formData.append("participationFee", placeData.participationFee);
  formData.append("oneLineIntroText", placeData.oneLineIntroText);
  const { data } = await axiosclient.post<CreatePlaceOutput>(
    `${BASE_URL}/place`,
    formData
  );
  return data;
};