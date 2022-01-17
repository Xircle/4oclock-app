import styled from "styled-components/native";
import { ChatInput, colors, GeneralText } from "../../styles/styles";
import React, { useEffect, useState } from "react";
import { useSocket } from "../../lib/hooks/useSocket";
import { RouteProp } from "@react-navigation/native";
import { ChatStackParamList } from "../../navigators/ChatStackNav";
import { useQuery } from "react-query";
import { GetRoomMessagesOutput, IMessage } from "../../lib/api/types";
import { getRoomMessages } from "../../lib/api/getRoomMessages";
import { Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MyKeyboardAvoidingView from "../../components/UI/MyKeyboardAvoidingView";

interface Props {
  route: RouteProp<ChatStackParamList, "ChatRoom">;
}

export default function ChatRoom({ route }: Props) {
  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState<IMessage[]>([]);
  let socket, disconnect;

  const SetUpSocket = async () => {
    console.log("start");
    [socket, disconnect] = await useSocket(route.params.roomId);
    console.log("done");
  };
  useEffect(() => {
    SetUpSocket();
    console.log(route.params.roomId);
  }, []);

  // api
  const { data: fetchedMessagesData, isFetching } = useQuery<
    GetRoomMessagesOutput | undefined
  >(
    ["room-chat", route.params.roomId, page],
    () => getRoomMessages(route.params.roomId, route.params.senderId, page, 40),
    {
      onError: (err: any) => {
        Alert.alert(err);
        return;
      },
      retry: 1,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    if (messages) console.log(messages);
  }, [messages]);
  useEffect(() => {
    if (!fetchedMessagesData?.messages) return;

    if (page === 1) {
      setMessages(fetchedMessagesData?.messages);
    } else if (page > 1 && !isFetching) {
      // pagination 시에 이전 데이터와 함께 보여주기 위해서 prev 사용
      setMessages((prev) => [...prev, ...fetchedMessagesData?.messages]);
    }
  }, [page, fetchedMessagesData, isFetching]);
  return (
    <Container edges={["bottom"]}>
      <MyKeyboardAvoidingView keyboardVerticalOffset={100}>
        <MessageContainer></MessageContainer>
        <InputContainer>
          <ChatInput />
          <SendButton>
            <Ionicons name="send" size={30} color={colors.mainBlue} />
          </SendButton>
        </InputContainer>
      </MyKeyboardAvoidingView>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
`;

const SendButton = styled.TouchableOpacity`
  margin-left: 10px;
`;

const MessageContainer = styled.View`
  flex: 1;
  background-color: red;
`;

const InputContainer = styled.View`
  width: 100%;
  height: 100px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;
