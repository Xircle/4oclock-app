import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { UserProfile } from "../lib/api/types";
import { AgeNumberToString } from "../lib/utils";
import { colors } from "../styles/styles";
import Loader from "../components/UI/Loader";
import ProfileV from "../components/profile/ProfileV";
import { seeUserById } from "../lib/api/seeUserById";
import { RouteProp } from "@react-navigation/native";
import { LoggedInStackParamList } from "../navigators/LoggedInNav";

interface Props {
  route: RouteProp<LoggedInStackParamList, "FriendProfile">;
}

export default function FriendProfile({ route }: Props) {
  const [age, setAge] = useState<string>("");
  const { data: profileData, isLoading, isFetching } = useQuery<
    UserProfile | undefined
  >(["friendProfile", route.params.id], () => seeUserById(route.params.id), {
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (profileData) {
      setAge(AgeNumberToString(profileData.age));
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
      <ProfileV profileData={profileData} />
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
