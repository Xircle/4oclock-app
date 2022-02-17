import styled from "styled-components/native";
import React from "react";
import { colors, XLButton, XLButtonText } from "../../styles/styles";
import { Dimensions } from "react-native";

interface Props {
  color?: string;
  onPress: () => void;
  disabled?: boolean;
  title: string;
  left?: number;
  bottom?: number;
}

const { width } = Dimensions.get("window");

export default function MainButtonWBg({
  onPress,
  disabled = false,
  title,
  left,
  bottom,
}: Props) {
  return (
    <Container bottom={bottom}>
      <XLButton onPress={onPress} disabled={disabled}>
        <XLButtonText>{title}</XLButtonText>
      </XLButton>
    </Container>
  );
}

const Container = styled.View<{ left?: number; bottom?: number }>`
  background-color: ${colors.bgColor};
  padding: ${width * 0.02 + "px"} ${width * 0.05 + "px"} ${width * 0.06 + "px"}
    ${width * 0.05 + "px"};
  position: absolute;
  left: ${(props) => (props.left ? props.left + "px" : 0)};
  bottom: ${(props) => (props.bottom ? props.bottom + "px" : 0)};
`;
