import styled from "styled-components/native";
import React from "react";
import { colors, XLButton, XLButtonText } from "../../styles/styles";
import { Dimensions } from "react-native";

interface Props {
  color?: string;
  onPress: () => void;
  disabled?: boolean;
}

const { width } = Dimensions.get("window");

export default function MainButtonWBg({ onPress, disabled = false }: Props) {
  return (
    <Container>
      <XLButton onPress={onPress} disabled={disabled}>
        <XLButtonText>수정하기</XLButtonText>
      </XLButton>
    </Container>
  );
}

const Container = styled.View`
  background-color: ${colors.bgColor};
  padding: ${width * 0.05 + "px"};
  position: absolute;
  left: 0;
  bottom: 0;
`;
