import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { UserProfile } from "../lib/api/types";
import { useDB } from "../lib/RealmDB";
import { Alert, Dimensions } from "react-native";
import { seeRandomProfile } from "../lib/api/seeRandomProfile";
import { AgeNumberToString } from "../lib/utils";
import { colors } from "../styles/styles";
import Loader from "../components/UI/Loader";
import ProfileV from "../components/profile/ProfileV";

interface Props {}

export default function RandomProfile(props: Props) {
  const [isYkClub, SetIsYkClub] = useState<boolean>(false);
  const [isYkOnly, SetIsYkOnly] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [age, setAge] = useState<string>("");
  const realm = useDB();
  const { data: randomProfileData, refetch, isLoading, isFetching } = useQuery<
    UserProfile | undefined
  >(["randomProfile"], () => seeRandomProfile(isYkClub && isYkOnly), {
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const refetchRandomProfileData = () => {
    refetch();
  };

  useEffect(() => {
    setLoading(isFetching);
  }, [isFetching]);
  useEffect(() => {
    if (randomProfileData) {
      setAge(AgeNumberToString(randomProfileData.age));
    }
  }, [randomProfileData?.age]);

  return (
    <Wrapper>
      {loading && (
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
        randomProfileData={randomProfileData}
        onPressNext={refetchRandomProfileData}
        enableChat={true}
        enableNext={true}
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
