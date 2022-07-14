import styled from "styled-components/native";
import { colors, fontFamilies, GeneralText } from "../../styles/styles";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getMyRooms } from "../../lib/api/getMyRooms";
import { GetMyRooms, IRoom } from "../../lib/api/types.d";
import ChatListFlatList from "../../components/chat/ChatListFlatList";
import { useNavigation } from "@react-navigation/native";
import messaging from "@react-native-firebase/messaging";
import storage, { StorageKey } from "../../lib/helpers/myAsyncStorage";
import { Alert } from "react-native";

interface Props {}

export default function ChatList(props: Props) {
  const navigation = useNavigation();
  const [showSubText, setShowSubText] = useState(false);
  const {
    data: chatRoomData,
    isLoading,
    refetch,
  } = useQuery<GetMyRooms | undefined>(["room"], () => getMyRooms(), {
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    async function setUp() {
      refetch();
      await storage.setItem(StorageKey.message, false);
    }
    messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage.data?.type === "message") {
        refetch();
      }
    });

    navigation.addListener("focus", (e) => {
      setUp();
    });
  }, []);

  useEffect(() => {
    if (chatRoomData?.myRooms.length === 0) {
      setShowSubText(true);
    }
    if (chatRoomData?.myRooms.length !== 0) {
      setShowSubText(false);
    }
  }, [chatRoomData]);

  return (
    <Container
      showsVerticalScrollIndicator={false}
      data={chatRoomData?.myRooms}
      ListHeaderComponent={
        <HeaderContainer>
          <HeaderMainText>크루원들과 소통해요</HeaderMainText>
          {showSubText && (
            <HeaderSubText>
              도착한 메세지가 없습니다. 먼저 크루원들에게 메세지를 보내보세요
            </HeaderSubText>
          )}
        </HeaderContainer>
      }
      keyExtractor={(item: IRoom) => item.id + ""}
      renderItem={({ item }) => (
        <ChatListFlatList
          roomId={item.id}
          lastMessage={item.lastMessage}
          receiver={item.receiver}
          latestMessageAt={item.latestMessageAt}
        />
      )}
    />
  );
}

const HeaderContainer = styled.View`
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 14px;
`;

const HeaderMainText = styled(GeneralText)`
  font-size: 30px;
  font-family: ${fontFamilies.bold};
`;

const HeaderSubText = styled(GeneralText)`
  margin-top: 10px;
  font-size: 18px;
  color: ${colors.midGrey};
`;

const Container = styled.FlatList`
  width: 100%;
  height: 100%;
  background-color: ${colors.bgColor};
`;
