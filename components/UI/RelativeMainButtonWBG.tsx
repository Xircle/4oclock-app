import styled from "styled-components/native";
import React from "react";
import { colors, XLButton, XLButtonText } from "../../styles/styles";

interface Props {
  color?: string;
  onPress: () => void;
  disabled?: boolean;
  title: string;
  bottom?: number;
}

export default function RelativeMainButtonWBg({
  onPress,
  disabled = false,
  title,
  bottom = 0,
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
  width: 100%;
  padding-bottom: ${(props) => (props.bottom ? props.bottom + "px" : 0)};
  align-items: center;
`;
