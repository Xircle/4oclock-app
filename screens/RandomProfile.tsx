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
import { seeRandomProfile } from "../lib/api/seeRandomProfile";
import { SafeAreaView } from 'react-native';

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

  const getAccountType = async () => {
    const accountType = await storage.getItem("accountType");
    console.log(accountType);
    if (accountType === "Admin") setShowPN(true);
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
          onPressChat={() =>
            // @ts-ignore
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
