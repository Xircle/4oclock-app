import AxiosClient from "../apiClient";
import {
  CancelReservationOutput,
  CancelReservationInput,
} from "../../lib/api/types";
import { AxiosResponse } from "axios";
import { BASE_URL } from "../utils";

export const cancelReservation = async (
  cancelReservationInput: CancelReservationInput
): Promise<AxiosResponse<CancelReservationOutput>> => {
  const axiosclient = await AxiosClient();
  return axiosclient.patch<CancelReservationOutput>(
    `${BASE_URL}/reservation/${cancelReservationInput.placeId}`,
    {
      cancelReason: cancelReservationInput.cancelReason,
      detailReason: cancelReservationInput.detailReason,
    }
  );
};
