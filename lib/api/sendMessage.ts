import { AxiosResponse } from "axios";
import AxiosClient from "../apiClient";
import { BASE_URL } from "../utils";
import { CoreOutput, SendMessageInput } from "./types";

interface SendMessageOutput extends CoreOutput {
  createdRoomId?: string;
}

export const sendMessage = async (
  sendMessageInput: SendMessageInput
): Promise<AxiosResponse<SendMessageOutput>> => {
  const axiosclient = await AxiosClient();
  const { roomId, isRead, content, receiverId } = sendMessageInput;
  return axiosclient.post(`${BASE_URL}/room/${roomId}/messages`, {
    content,
    receiverId,
    isRead,
    sentAt: new Date(),
  });
};
