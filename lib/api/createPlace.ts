import { CreateActivityOutput, CreateActivityData } from "./types.d";
import AxiosClient from "../apiClient";
import { BASE_URL } from "../utils";

export const createPlace = async (
  placeData: CreateActivityData
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
  if (placeData.maxParticipantsNumber)
    formData.append(
      "maxParticipantsNumber",
      placeData.maxParticipantsNumber + ""
    );
  formData.append("detailAddress", placeData.detailAddress);
  formData.append("description", placeData.description);
  formData.append("startDateAt", placeData.startDateAt + "");
  formData.append("participationFee", placeData.participationFee);
  const { data } = await axiosclient.post<CreateActivityOutput>(
    `${BASE_URL}/place`,
    formData
  );
  return data;
};
