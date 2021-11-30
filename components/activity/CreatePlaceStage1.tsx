import styled from "styled-components/native";
import React, { useRef, useState } from "react";
import {
  BlackLabel,
  colors,
  MainHeading,
  SubHeading,
} from "../../styles/styles";
import { ScrollView, View, Animated } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import ExpandableV from "../UI/ExpandableV";

interface Props {}

export default function CreatePlaceStage1(props: Props) {
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MainHeading>모임을 열어볼까?</MainHeading>
        <SubHeading style={{ marginTop: 20, marginBottom: 20 }}>
          재밌는 모임을 열어보자~~ 행복하고 재밌는 모임
        </SubHeading>

        <ExpandableV title="어떤 모임인가요? (제목)" height={100}>
          <MainHeading>모임을 열어볼까?</MainHeading>
        </ExpandableV>
        <ExpandableV title="모임에 대한 간단한 소개!" height={100}>
          <MainHeading>모임을 열어볼까?</MainHeading>
        </ExpandableV>
        <ExpandableV title="만남시간" height={100}>
          <MainHeading>모임을 열어볼까?</MainHeading>
        </ExpandableV>
        <ExpandableV title="만남장소" height={100}>
          <MainHeading>모임을 열어볼까?</MainHeading>
        </ExpandableV>
        <ExpandableV title="최대 참가인원" height={100}>
          <MainHeading>모임을 열어볼까?</MainHeading>
        </ExpandableV>
        <ExpandableV title="참가비" height={100}>
          <MainHeading>모임을 열어볼까?</MainHeading>
        </ExpandableV>
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

const AnimWrapper = styled(Animated.createAnimatedComponent(View))``;
