import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { UserProfile } from "../lib/api/types";
import { colors } from "../styles/styles";
import Loader from "../components/UI/Loader";
import ProfileV from "../components/profile/ProfileV";
import { seeUserById } from "../lib/api/seeUserById";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { LoggedInStackParamList } from "../navigators/LoggedInNav";
import storage from "../lib/helpers/myAsyncStorage";
import { getMyRooms } from "../lib/api/getMyRooms";
import { Alert } from "react-native";

interface Props {
  route: RouteProp<LoggedInStackParamList, "FriendProfile">;
}

export default function FriendProfile({ route }: Props) {
  const navigation = useNavigation();
  const [showPN, setShowPN] = useState<boolean>(false);
  const {
    data: profileData,
    isLoading,
    isFetching,
  } = useQuery<UserProfile | undefined>(
    ["friendProfile", route.params.id],
    () => seeUserById(route.params.id),
    {
      retry: 1,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const { mutateAsync: mutateChatRoomData } = useMutation(getMyRooms);
  const getAccountType = async () => {
    const accountType = await storage.getItem("accountType");

    if (accountType === "Admin") setShowPN(true);
  };

  useEffect(() => {
    getAccountType();
  }, [profileData?.age]);

  const pressChat = async () => {
    try {
      const { myRooms } = await mutateChatRoomData();
      if (myRooms.find((room) => room.receiver.id === profileData.fk_user_id)) {
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
  return (
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
        enableChat={true}
        onPressChat={pressChat}
      />
    </Wrapper>
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
