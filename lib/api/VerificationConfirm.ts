import { VerificationConfirmInput, VerificationConfirmOutput } from "./types.d";
import { AxiosResponse } from "axios";
import AxiosClient from "../apiClient";
import { BASE_URL } from "../utils";

export const confirmReservation = async (
  confirmVerificationInput: VerificationConfirmInput
): Promise<AxiosResponse<VerificationConfirmOutput>> => {
  const axiosclient = await AxiosClient();
  return axiosclient.post<VerificationConfirmInput>(
    `${BASE_URL}/sms/send`,
    confirmVerificationInput
  );
};
