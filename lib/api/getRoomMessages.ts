import { GetRoomMessagesOutput, IMessage } from "./types.d";
import AxiosClient from "../apiClient";
import { BASE_URL } from "../utils";

export const getRoomMessages = async (
  roomId: string,
  receiverId: string,
  page: number,
  limit: number = 40
): Promise<GetRoomMessagesOutput | undefined> => {
  if (roomId === "0") return;
  const axiosclient = await AxiosClient();
  const { data } = await axiosclient.get<GetRoomMessagesOutput>(
    `${BASE_URL}/room/${roomId}/messages/${receiverId}?page=${page}&limit=${limit}`
  );
  if (!data.ok) {
    // 권한이 없습니다.
    throw new Error(data.error);
  }
  return data;
};
