import AxiosClient from "../apiClient";
import { GetReservationParticipantNumberOutput } from "./types.d";

export const getReservationParticipantNumber = async (
  placeId: string
): Promise<number | undefined> => {
  const axiosclient = await AxiosClient();
  const { data } = await axiosclient.get<GetReservationParticipantNumberOutput>(
    `/reservation/${placeId}/number`
  );
  if (!data.ok) {
    throw new Error(data.error);
  }
  return data.participantsNumber;
};
