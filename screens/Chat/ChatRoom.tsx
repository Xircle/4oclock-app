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

interface Props {
  route: RouteProp<ChatStackParamList, "ChatRoom">;
}

export default function ChatRoom({ route }: Props) {
  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [roomId, setRoomId] = useState(route.params.roomId);
  const [isEntering, setIsEntering] = useState(false);
  const [isReceiverJoining, setIsReceiverJoining] = useState(false);
  const [messageInput, SetMessageInput] = useState("");

  useEffect(() => {
    if (route.params.roomId) console.log(route.params.roomId);
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

  const { data: userData } = useQuery<UserData | undefined>(
    ["userProfile"],
    () => getUser(),
    {
      retry: 1,
    }
  );

  // 소켓으로부터 받은 메세지 콜백
  const receivedMsgFromSocket = useCallback(
    ({ content, sentAt }) => {
      //if (!scrollbarRef?.current) return;
      //showNewMessageAlertHandler(scrollbarRef.current.getValues().top);
      setMessages((prev) => {
        // isRead: true
        return [{ content, isMe: false, sentAt }, ...prev];
      });
    },
    [messages]
  );

  useEffect(() => {
    if (!fetchedMessagesData?.messages) return;

    if (page === 1) {
      setMessages(fetchedMessagesData?.messages);
    } else if (page > 1 && !isFetching) {
      // pagination 시에 이전 데이터와 함께 보여주기 위해서 prev 사용
      setMessages((prev) => [...prev, ...fetchedMessagesData?.messages]);
    }
  }, [page, fetchedMessagesData, isFetching]);

  const isEnteringCallBack = ({ flag }) => {
    setIsEntering(flag);
  };

  const { mutateAsync: mutateMessage } = useMutation(sendMessage);

  const onSubmitHandler = useCallback(async () => {
    if (messageInput.trim().length === 0 || !userData?.fk_user_id) return;
    SetMessageInput("");
    // 로컬 message state 에 동기화
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
    //console.log(route.params.senderId);
    console.log(roomId);
    //console.log(route.params.senderName);
    // POST 비동기로 요청
    mutateMessage({
      content: messageInput,
      receiverId: route.params.senderId,
      roomId: roomId,
      // isRead: isReceiverJoining,
    }).then((res) => {
      console.log(res.data);
      if (!res.data.ok) {
        Alert.alert("전송에 실패했습니다. 잠시 후 다시 시도해주세요");
        // 전송에 실패했으므로, 로컬의 message의 말풍선에 X 추가한다.
        return;
      }
      SetMessageInput("");
      if (roomId === "0" && res.data.createdRoomId) {
        setRoomId(res.data.createdRoomId);
        // 만약 unmount되었을 때 이 promise는 실행이 될까?
        // storage.setItem(
        //   `chat-${route.params.senderId}`,
        //   res.data.createdRoomId
        // );
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

const MessageWrapper = styled.View`
  width: 100%;
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
