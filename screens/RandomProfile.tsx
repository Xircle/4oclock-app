import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { UserProfile, UserData, GetMyRooms } from "../lib/api/types";
import { useDB } from "../lib/RealmDB";
import { Alert } from "react-native";
import { seeRandomProfile } from "../lib/api/seeRandomProfile";
import { TOKEN } from "../lib/utils";

interface Props {}

export default function RandomProfile(props: Props) {
  const [isYkClub, SetIsYkClub] = useState<boolean>(false);
  const [isYkOnly, SetIsYkOnly] = useState<boolean>(true);
  const realm = useDB();

  const { data: randomProfileData, refetch, isLoading, isFetching } = useQuery<
    UserProfile | undefined
  >(["randomProfile"], () => seeRandomProfile(isYkClub && isYkOnly), {
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (realm.objects("UserSchema")[0].token) {
      console.log(realm.objects("UserSchema")[0]);
    } else {
      Alert.alert("token missing");
    }
    console.log(TOKEN);
  }, []);

  return (
    <Container>
      <Text>random profile</Text>
      <Text>{randomProfileData?.MBTI}</Text>
      <Text>random profile</Text>
      <Text>random profile</Text>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;
