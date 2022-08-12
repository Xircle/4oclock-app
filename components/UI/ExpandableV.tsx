import styled from "styled-components/native";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlackLabel, colors } from "../../styles/styles";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  height: number;
  title: string;
  error?: Boolean | undefined;
  refreshCount?: number;
}

const { width } = Dimensions.get("window");

export default function ExpandableV({
  children,
  height,
  title,
  error,
  refreshCount,
}: Props) {
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
      duration: 300,
    }).start();
    setExpandableState((prev) => prev + 1);
  };

  useEffect(() => {
    expandableAnim.setValue(0);
  }, [refreshCount]);
  return (
    <Container>
      <TouchableWithoutFeedback onPress={expandTime}>
        <SpaceBetweenContainer>
          <SBlackLabel error={error}>{title}</SBlackLabel>
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

const SBlackLabel = styled(BlackLabel)<{ error?: Boolean }>`
  color: ${(props) => (props.error ? colors.veryLightRed : colors.black)};
`;

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
