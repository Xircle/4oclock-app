import { VerificationConfirmInput, VerificationConfirmOutput } from "./types";
import { AxiosResponse } from "axios";
import AxiosClient from "../apiClient";
import { BASE_URL } from "../utils";

export const confirmVerification = async (
  confirmVerificationInput: VerificationConfirmInput
): Promise<AxiosResponse<VerificationConfirmOutput>> => {
  const axiosclient = await AxiosClient();
  return axiosclient.post<VerificationConfirmInput>(
    `${BASE_URL}/sms/confirm`,
    confirmVerificationInput
  );
};
