import AxiosClient from "../apiClient";
import {
  CancelReservationOutput,
  CancelReservationByCreatorInput,
} from "../../lib/api/types";
import { AxiosResponse } from "axios";
import { BASE_URL } from "../utils";

export const cancelReservationByCreator = async (
  cancelReservationByCreatorInput: CancelReservationByCreatorInput
): Promise<AxiosResponse<CancelReservationOutput>> => {
  const axiosclient = await AxiosClient();
  return axiosclient.patch<CancelReservationOutput>(
    `${BASE_URL}/reservation/cancel-by-creator/${cancelReservationByCreatorInput.placeId}/${cancelReservationByCreatorInput.participantId}`
  );
};
