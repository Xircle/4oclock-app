import styled from "styled-components/native";
import { colors, GeneralText } from "../../styles/styles";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { getMyRooms } from "../../lib/api/getMyRooms";
import { GetMyRooms, IRoom } from "../../lib/api/types.d";
import ChatListFlatList from "../../components/chat/ChatListFlatList";
import { useNavigation } from "@react-navigation/native";

interface Props {}

export default function ChatList(props: Props) {
  const navigation = useNavigation();
  const { data: chatRoomData, isLoading, refetch } = useQuery<
    GetMyRooms | undefined
  >(["room"], () => getMyRooms(), {
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", (e) => {
      // Do something
      if (!isLoading) refetch();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Container
      showsVerticalScrollIndicator={false}
      data={chatRoomData?.myRooms}
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

const Container = styled.FlatList`
  width: 100%;
  height: 100%;
  background-color: ${colors.bgColor};
`;
