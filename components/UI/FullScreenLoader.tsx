import { ActivityIndicator, Dimensions } from "react-native";
import styled from "styled-components/native";
import React from "react";
import { colors } from "../../styles/styles";

interface Props {
  notFullScreen?: boolean;
}

const { width, height } = Dimensions.get("window");

export default function FullScreenLoader({ notFullScreen }: Props) {
  return (
    <Container>
      <ActivityIndicator color={colors.mainBlue} size="large" />
    </Container>
  );
}

const Container = styled.View<{ notFullScreen?: boolean }>`
  position: absolute;
  width: ${(props) => (props.notFullScreen ? "100%" : width + "px")};
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  justify-content: center;
  align-items: center;
`;
