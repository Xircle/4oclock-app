import styled from "styled-components/native";
import React from "react";
import {
  BlackLabel,
  colors,
  MainHeading,
  SubHeading,
} from "../../styles/styles";
import { ScrollView } from "react-native";

interface Props {}

export default function CreatePlaceStage1(props: Props) {
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MainHeading>모임을 열어볼까?</MainHeading>
        <SubHeading style={{ marginTop: 20, marginBottom: 20 }}>
          재밌는 모임을 열어보자~~ 행복하고 재밌는 모임
        </SubHeading>
        <InnerContainer>
          <BlackLabel>어떤 모임인가요? (제목)</BlackLabel>
        </InnerContainer>
        <InnerContainer>
          <BlackLabel>모임에 대한 간단한 소개!</BlackLabel>
        </InnerContainer>
        <SpaceBetweenContainer>
          <BlackLabel>만남시간</BlackLabel>
        </SpaceBetweenContainer>
        <SpaceBetweenContainer>
          <BlackLabel>만남위치</BlackLabel>
        </SpaceBetweenContainer>
        <SpaceBetweenContainer>
          <BlackLabel>참가인원</BlackLabel>
        </SpaceBetweenContainer>
        <SpaceBetweenContainer>
          <BlackLabel>만남 fee</BlackLabel>
        </SpaceBetweenContainer>
      </ScrollView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
  padding: 0px 30px;
`;

const InnerContainer = styled.View`
  margin: 10px 0;
`;

const SpaceBetweenContainer = styled.View`
  margin: 10px 0;
  justify-content: space-between;
`;
