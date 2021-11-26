import { MakeReservationInput, MakeReservationOutput } from "./types.d";
import { AxiosResponse } from "axios";
import AxiosClient from "../apiClient";

export const makeReservation = async (
  makeReservationInput: MakeReservationInput
): Promise<AxiosResponse<MakeReservationOutput>> => {
  const axiosclient = await AxiosClient();
  return axiosclient.post<MakeReservationOutput>(
    "reservation",
    makeReservationInput
  );
};
