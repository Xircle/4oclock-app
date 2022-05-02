import { RouteProp } from "@react-navigation/native";
import React, { useEffect } from "react";
import styled from "styled-components/native";
import { LoggedInStackParamList } from "../../navigators/LoggedInNav";
import { colors, MainHeading } from "../../styles/styles";

interface Props {
  route: RouteProp<LoggedInStackParamList, "ParticipantsList">;
}

export default function ParticipantsList({ route }: Props) {
  useEffect(() => {
    console.log(route.params.participants);
  }, []);

  return (
    <Container showsVerticalScrollIndicator={false}>
      <Heading>ParticipantsList</Heading>
    </Container>
  );
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${colors.bgColor};
`;

const Heading = styled(MainHeading)``;
