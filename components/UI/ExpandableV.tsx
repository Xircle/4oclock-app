import styled from "styled-components/native";
import React, { useRef, useState } from "react";
import {
  View,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlackLabel } from "../../styles/styles";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  height: number;
  title: string;
}

const { width } = Dimensions.get("window");

export default function ExpandableV({ children, height, title }: Props) {
  // values
  const [expandableState, setExpandableState] = useState(0);
  const expandableAnim = useRef(new Animated.Value(0)).current;
  const rotation = expandableAnim.interpolate({
    inputRange: [0, height],
    outputRange: ["0deg", "540deg"],
  });

  const opacity = expandableAnim.interpolate({
    inputRange: [0, height],
    outputRange: [0, 1],
  });
  // animations
  const expandTime = () => {
    Animated.timing(expandableAnim, {
      toValue: ((expandableState + 1) % 2) * height,
      useNativeDriver: false,
    }).start();
    setExpandableState((prev) => prev + 1);
  };
  return (
    <Container>
      <TouchableWithoutFeedback onPress={expandTime}>
        <SpaceBetweenContainer>
          <BlackLabel>{title}</BlackLabel>
          <Animated.View style={{ transform: [{ rotateZ: rotation }] }}>
            <Ionicons name="chevron-down" size={24} color="black" />
          </Animated.View>
        </SpaceBetweenContainer>
      </TouchableWithoutFeedback>
      <AnimWrapper style={{ height: expandableAnim, opacity: opacity }}>
        {children}
      </AnimWrapper>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const SpaceBetweenContainer = styled.View`
  margin: 10px 0;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

const AnimWrapper = styled(Animated.createAnimatedComponent(View))`
  width: 100%;
`;
