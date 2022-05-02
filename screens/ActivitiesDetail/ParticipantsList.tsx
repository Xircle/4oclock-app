import { RouteProp } from "@react-navigation/native";
import React, { useEffect } from "react";
import styled from "styled-components/native";
import { LoggedInStackParamList } from "../../navigators/LoggedInNav";
import { colors, fontFamilies, GeneralText } from "../../styles/styles";

interface Props {
  route: RouteProp<LoggedInStackParamList, "ParticipantsList">;
}

export default function ParticipantsList({ route }: Props) {
  useEffect(() => {
    console.log(route.params.participants);
  }, []);

  return (
    <Container showsVerticalScrollIndicator={false}>
      <Heading>{route.params.placeName}</Heading>
      <AgeContainer>
        <AgeText>남 {route.params.participantsData.maleCount}</AgeText>
        <AgeText>여 {route.params.participantsData.femaleCount}</AgeText>
      </AgeContainer>
    </Container>
  );
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${colors.bgColor};
  padding: 15px;
`;

const Heading = styled(GeneralText)`
  font-family: ${fontFamilies.medium};
  font-size: 26px;
`;

const AgeContainer = styled.View`
  flex-direction: row;
  margin-top: 30px;
`;

const AgeText = styled(GeneralText)`
  margin-right: 10px;
  font-size: 20px;
  font-family: ${fontFamilies.medium};
  color: ${colors.midGrey};
`;
