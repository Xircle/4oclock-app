import { useCallback } from "react";
import { io, Socket } from "socket.io-client";
import storage from "../helpers/myAsyncStorage";
import { BASE_URL } from "../utils";

// http://localhost:3080
// process.env.REACT_APP_TEST_API_SERVER

const existingSockets: { [key: string]: Socket } = {};

export type UseSocketOutput = [Socket, () => void];

export const useSocket = async (roomId: string): Promise<UseSocketOutput> => {
  const token = await storage.getItem("token");
  const disconnect = () => {
    if (existingSockets[roomId]) {
      existingSockets[roomId].disconnect();
      delete existingSockets[roomId];
    }
  };
  if (!existingSockets[roomId]) {
    existingSockets[roomId] = io(`${BASE_URL}/chat`, {
      transports: ["websocket"],
      withCredentials: true,
      auth: {
        authorization: `Bearer ${token || ""}`,
      },
    });
    //console.log("create socket", roomId, existingSockets[roomId]);
  }

  return [existingSockets[roomId], disconnect];
};
