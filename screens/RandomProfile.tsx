import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { UserProfile } from "../lib/api/types";
import { colors } from "../styles/styles";
import Loader from "../components/UI/Loader";
import ProfileV from "../components/profile/ProfileV";
import {  useNavigation } from "@react-navigation/native";
import storage from "../lib/helpers/myAsyncStorage";
import { seeRandomProfile } from "../lib/api/seeRandomProfile";
import { Alert, SafeAreaView } from "react-native";
import { getMyRooms } from "../lib/api/getMyRooms";

interface Props {}

export default function RnadomProfile(props: Props) {
  const navigation = useNavigation();
  const [showPN, setShowPN] = useState<boolean>(false);

  const { data: profileData, refetch, isLoading, isFetching } = useQuery<
    UserProfile | undefined
  >(["randomProfile"], () => seeRandomProfile(false), {
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: mutateChatRoomData } = useMutation(getMyRooms);

  const getAccountType = async () => {
    const accountType = await storage.getItem("accountType");
    console.log(accountType);
    if (accountType === "Admin") setShowPN(true);
  };

  const pressChat = async () => {
    try {
      const { myRooms } = await mutateChatRoomData();
      if (myRooms.find((room) => room.receiver.id === profileData.fk_user_id)) {
        console.log("found");
        // @ts-ignore
        navigation.navigate("ChatStackNav", {
          screen: "ChatRoom",
          params: {
            senderName: profileData.username,
            senderId: profileData.fk_user_id,
            roomId: myRooms.find(
              (room) => room.receiver.id === profileData.fk_user_id
            ).id,
          },
        });
      } else {
        // @ts-ignore
        navigation.navigate("ChatStackNav", {
          screen: "ChatRoom",
          params: {
            senderName: profileData.username,
            senderId: profileData.fk_user_id,
            roomId: "0",
          },
        });
      }
    } catch (e) {
      Alert.alert("일시적 에러가 발생했습니다. 앱 종료 후 다시 시작해주세요");
    }
  };

  useEffect(() => {
    getAccountType();
  }, [profileData?.age]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", (e) => {
      // Do something
      if (!isLoading) refetch();
    });
    console.log(isLoading);
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgColor }}>
      <Wrapper>
        {(isLoading || isFetching) && (
          <LoaderWrapper
            style={{
              transform: [{ translateX: -15 }],
              zIndex: 3,
            }}
          >
            <Loader color={colors.mainBlue} large={true} />
          </LoaderWrapper>
        )}
        <ProfileV
          profileData={profileData}
          showPN={showPN}
          onPressNext={refetch}
          enableChat={true}
          enableNext={true}
          onPressChat={pressChat}
        />
      </Wrapper>
    </SafeAreaView>
  );
}

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: ${colors.bgColor};
`;

const LoaderWrapper = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;
