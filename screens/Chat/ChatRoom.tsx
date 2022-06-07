import styled from "styled-components/native";
import { ChatInput, colors } from "../../styles/styles";
import React, { useCallback, useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { ChatStackParamList } from "../../navigators/ChatStackNav";
import { useMutation, useQuery } from "react-query";
import { GetRoomMessagesOutput, IMessage, UserData } from "../../lib/api/types";
import { getRoomMessages } from "../../lib/api/getRoomMessages";
import { Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MyKeyboardAvoidingView from "../../components/UI/MyKeyboardAvoidingView";
import ChatMessage from "../../components/chat/ChatMessage";
import { getUser } from "../../lib/api/getUser";
import { sendMessage } from "../../lib/api/sendMessage";
import messaging from "@react-native-firebase/messaging";

interface Props {
  route: RouteProp<ChatStackParamList, "ChatRoom">;
}

export default function ChatRoom({ route }: Props) {
  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [roomId, setRoomId] = useState(route.params.roomId);
  const [messageInput, SetMessageInput] = useState("");

  // api
  const { data: fetchedMessagesData, isFetching } = useQuery<
    GetRoomMessagesOutput | undefined
  >(
    ["room-chat", roomId, page],
    () => getRoomMessages(roomId, route.params.senderId, page, 40),
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

  const { data: userData } = useQuery<UserData | undefined>(
    ["userProfile"],
    () => getUser(),
    {
      retry: 1,
    }
  );

  useEffect(() => {
    if (!fetchedMessagesData?.messages) return;

    if (page === 1) {
      setMessages(fetchedMessagesData?.messages);
    } else if (page > 1 && !isFetching) {
      setMessages((prev) => [...prev, ...fetchedMessagesData?.messages]);
    }
  }, [page, fetchedMessagesData, isFetching]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (
        remoteMessage.data?.type === "message" &&
        remoteMessage.data?.receiverId === userData?.fk_user_id &&
        remoteMessage.data?.senderId === route.params.senderId
      ) {
        setMessages((prev) => {
          const messages = [
            {
              content: remoteMessage.data?.content,
              isMe: false,
              sentAt: new Date(remoteMessage.data?.sentAt),
            },
            ...prev,
          ];
          return messages;
        });
      }
    });

    return unsubscribe;
  }, []);

  const { mutateAsync: mutateMessage } = useMutation(sendMessage);

  const onSubmitHandler = useCallback(async () => {
    if (messageInput.trim().length === 0 || !userData?.fk_user_id) return;
    setMessages((prev) => {
      const messages = [
        {
          content: messageInput,
          isMe: true,
          sentAt: new Date(),
          // isRead: isReceiverJoining ? true : false,
        },
        ...prev,
      ];
      return messages;
    });
    SetMessageInput("");
    mutateMessage({
      content: messageInput,
      receiverId: route.params.senderId,
      roomId: roomId,
    }).then((res) => {
      if (!res.data.ok) {
        Alert.alert("전송에 실패했습니다. 잠시 후 다시 시도해주세요");
        return;
      }
      if (roomId === "0" && res.data.createdRoomId) {
        setRoomId(res.data.createdRoomId);
      }
    });
  }, [messageInput, route.params.senderId, roomId, mutateMessage]);

  return (
    <Container edges={["bottom"]}>
      <MyKeyboardAvoidingView keyboardVerticalOffset={100}>
        <MessageContainer
          showsVerticalScrollIndicator={false}
          inverted
          data={messages}
          keyExtractor={(item: IMessage) => item.sentAt + "" + Math.random()}
          renderItem={({ item }) => (
            <ChatMessage
              content={item.content}
              isMe={item.isMe}
              isRead={item.isRead}
              sentAt={item.sentAt}
            />
          )}
        />

        <InputContainer>
          <ChatInput
            defaultValue={messageInput}
            onChange={(event) => {
              const { eventCount, target, text } = event.nativeEvent;
              SetMessageInput(text);
            }}
            onBlur={onSubmitHandler}
          />
          <SendButton onPress={onSubmitHandler}>
            <Ionicons name="send" size={30} color={colors.mainBlue} />
          </SendButton>
        </InputContainer>
      </MyKeyboardAvoidingView>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.bgColor};
`;

const SendButton = styled.TouchableOpacity`
  margin-left: 10px;
`;

const MessageContainer = styled.FlatList`
  flex: 1;
`;

const InputContainer = styled.View`
  width: 100%;
  height: 100px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;
