import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { UserProfile } from "../lib/api/types";
import { AgeNumberToString } from "../lib/utils";
import { colors } from "../styles/styles";
import Loader from "../components/UI/Loader";
import ProfileV from "../components/profile/ProfileV";
import { seeUserById } from "../lib/api/seeUserById";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { LoggedInStackParamList } from "../navigators/LoggedInNav";
import storage from "../lib/helpers/myAsyncStorage";

interface Props {
  route: RouteProp<LoggedInStackParamList, "FriendProfile">;
}

export default function FriendProfile({ route }: Props) {
  const navigation = useNavigation();
  const [age, setAge] = useState<string>("");
  const [showPN, setShowPN] = useState<boolean>(false);
  const { data: profileData, isLoading, isFetching } = useQuery<
    UserProfile | undefined
  >(["friendProfile", route.params.id], () => seeUserById(route.params.id), {
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const setAccountType = async () => {
    const accountType = await storage.getItem("accountType");
    console.log(accountType);
    if (accountType === "Admin") setShowPN(true);
  };

  useEffect(() => {
    setAccountType();
    if (profileData) {
      setAge(AgeNumberToString(profileData.age));
      console.log(profileData);
    }
  }, [profileData?.age]);

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
        onPressChat={() =>
          navigation.navigate("ChatStackNav", {
            screen: "ChatRoom",
            params: {
              senderName: profileData.username,
              senderId: profileData.fk_user_id,
              roomId: "0",
            },
          })
        }
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
