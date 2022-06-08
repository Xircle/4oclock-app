import { VerificationSendInput, VerificationSendOutput } from "./types.d";
import { AxiosResponse } from "axios";
import AxiosClient from "../apiClient";
import { BASE_URL } from "../utils";

export const sendReservation = async (
  sendVerificationInput: VerificationSendInput
): Promise<AxiosResponse<VerificationSendOutput>> => {
  const axiosclient = await AxiosClient();
  return axiosclient.post<VerificationSendOutput>(
    `${BASE_URL}/sms/send`,
    sendVerificationInput
  );
};
