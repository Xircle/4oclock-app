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

interface Props {}

export default function CreatePlaceStage1(props: Props) {
  // values
  const [expandableStateTime, setExpandableStateTime] = useState(0);
  const [expandableStateLocation, setExpandableStateLocation] = useState(0);
  const expandHeightTime = 100;
  const expandHeightLocation = 100;
  const expandableAnimTime = useRef(new Animated.Value(0)).current;
  const expandableAnimLocation = useRef(new Animated.Value(0)).current;

  const rotationTime = expandableAnimTime.interpolate({
    inputRange: [
      0,
      expandHeightTime / 4,
      expandHeightTime / 2,
      (expandHeightTime / 4) * 3,
      expandHeightTime,
    ],
    outputRange: ["0deg", "135deg", "270deg", "405deg", "540deg"],
  });

  const rotationLocation = expandableAnimLocation.interpolate({
    inputRange: [
      0,
      expandHeightLocation / 4,
      expandHeightLocation / 2,
      (expandHeightLocation / 4) * 3,
      expandHeightLocation,
    ],
    outputRange: ["0deg", "135deg", "270deg", "405deg", "540deg"],
  });

  // animations
  const expandTime = () => {
    Animated.timing(expandableAnimTime, {
      toValue: ((expandableStateTime + 1) % 2) * expandHeightTime,
      useNativeDriver: false,
    }).start();
    setExpandableStateTime((prev) => prev + 1);
  };
  const expandLocation = () => {
    Animated.timing(expandableAnimLocation, {
      toValue: ((expandableStateLocation + 1) % 2) * expandHeightLocation,
      useNativeDriver: false,
    }).start();
    setExpandableStateLocation((prev) => prev + 1);
  };

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
        <TouchableWithoutFeedback onPress={expandTime}>
          <SpaceBetweenContainer>
            <SBlackLabel>만남시간</SBlackLabel>
            <Animated.View style={{ transform: [{ rotateZ: rotationTime }] }}>
              <Ionicons name="chevron-down" size={24} color="black" />
            </Animated.View>
          </SpaceBetweenContainer>
        </TouchableWithoutFeedback>
        <AnimWrapper style={{ height: expandableAnimTime }} />
        <TouchableWithoutFeedback onPress={expandLocation}>
          <SpaceBetweenContainer>
            <SBlackLabel>만남위치</SBlackLabel>
            <Animated.View style={{ transform: [{ rotateZ: rotationLocation }] }}>
              <Ionicons name="chevron-down" size={24} color="black" />
            </Animated.View>
          </SpaceBetweenContainer>
        </TouchableWithoutFeedback>
        <AnimWrapper style={{ height: expandableAnimLocation }} />
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

const AnimWrapper = styled(Animated.createAnimatedComponent(View))``;
