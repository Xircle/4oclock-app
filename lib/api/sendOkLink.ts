import { CoreOutput, SendOkLinkInput } from "./types.d";
import AxiosClient from "../apiClient";
import { BASE_URL } from "../utils";

export const sendOkLink = async (
  sendOkLinkInput: SendOkLinkInput
): Promise<CoreOutput> => {
  const axiosclient = await AxiosClient();
  const { data } = await axiosclient.get<CoreOutput>(
    `${BASE_URL}/place/sendOkLink/${sendOkLinkInput.placeId}/${sendOkLinkInput.receiverId}`
  );
  if (!data.ok) {
    throw new Error(data.error);
  }
  return data;
};
