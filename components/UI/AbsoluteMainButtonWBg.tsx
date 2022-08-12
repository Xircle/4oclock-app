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

export default function AbsoluteMainButtonWBg({
  onPress,
  disabled = false,
  title,
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

const Container = styled.View<{ bottom?: number }>`
  background-color: ${colors.white};
  padding: ${width * 0.02 + "px"} ${width * 0.05 + "px"} ${width * 0.06 + "px"}
    ${width * 0.05 + "px"};
  position: absolute;
  bottom: ${(props) => (props.bottom ? props.bottom + "px" : 0)};
`;
