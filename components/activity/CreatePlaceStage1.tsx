import styled from "styled-components/native";
import React, { useRef, useState } from "react";
import {
  BlackLabel,
  colors,
  MainHeading,
  SubHeading,
} from "../../styles/styles";
import { ScrollView, View } from "react-native";
import Animated from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

interface Props {}

export default function CreatePlaceStage1(props: Props) {
  // values

  // animations

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MainHeading>모임을 열어볼까?</MainHeading>
        <SubHeading style={{ marginTop: 20, marginBottom: 20 }}>
          재밌는 모임을 열어보자~~ 행복하고 재밌는 모임
        </SubHeading>
        <InnerContainer>
          <SBlackLabel>어떤 모임인가요? (제목)</SBlackLabel>
        </InnerContainer>
        <InnerContainer>
          <SBlackLabel>모임에 대한 간단한 소개!</SBlackLabel>
        </InnerContainer>
        <TouchableWithoutFeedback>
          <SpaceBetweenContainer>
            <SBlackLabel>만남시간</SBlackLabel>
            <Ionicons name="add-outline" size={24} color="black" />
          </SpaceBetweenContainer>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <SpaceBetweenContainer>
            <SBlackLabel>만남위치</SBlackLabel>
            <Ionicons name="add-outline" size={24} color="black" />
          </SpaceBetweenContainer>
        </TouchableWithoutFeedback>
        <SpaceBetweenContainer>
          <SBlackLabel>참가인원</SBlackLabel>
        </SpaceBetweenContainer>
        <SpaceBetweenContainer>
          <SBlackLabel>만남 fee</SBlackLabel>
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
  flex-direction: row;
  align-items: center;
`;

const SBlackLabel = styled(BlackLabel)``;

const AnimationWrapper = styled(Animated.createAnimatedComponent(View))`
  background-color: ${colors.bgColor};
  width: 100%;
`;
