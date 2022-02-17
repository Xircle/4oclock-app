import { MakeReservationInput, MakeReservationOutput } from "./types.d";
import { AxiosResponse } from "axios";
import AxiosClient from "../apiClient";
import { BASE_URL } from "../utils";

export const makeReservation = async (
  makeReservationInput: MakeReservationInput
): Promise<AxiosResponse<MakeReservationOutput>> => {
  console.log(makeReservationInput);
  const axiosclient = await AxiosClient();
  return axiosclient.post<MakeReservationOutput>(
    `${BASE_URL}/reservation`,
    makeReservationInput
  );
};
