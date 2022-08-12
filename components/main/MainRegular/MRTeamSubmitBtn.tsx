import styled from "styled-components/native";
import React from "react";
import { Dimensions } from "react-native";
import { colors, XLButton, XLButtonText } from "../../../styles/styles";

interface Props {
  color?: string;
  onPress: () => void;
  disabled?: boolean;
  title: string;
  top?: number;
  marginV?: number;
}

const { width } = Dimensions.get("window");

export default function MRTeamSubmitBtn({
  onPress,
  disabled = false,
  title,
  top = 0,
  marginV = 0,
}: Props) {
  return (
    <Container top={top}>
      <TeamButton onPress={onPress} disabled={disabled}>
        <XLButtonText>{title}</XLButtonText>
      </TeamButton>
    </Container>
  );
}

const Container = styled.View<{ marginV?: number; top?: number }>`
  background-color: ${colors.white};
  width: 100%;
  padding-top: ${(props) => (props.top ? props.top + "px" : 0)};
  align-items: center;
`;

export const TeamButton = styled.TouchableOpacity<{
  disabled?: boolean;
  bgColor?: string;
}>`
  background-color: ${(props) =>
    props.disabled
      ? colors.bareGrey
      : props.bgColor
      ? props.bgColor
      : colors.vividBlue};
  border-radius: ${width / 25 + "px"};
  width: 45%;
  height: ${width * 0.12 + "px"};
  justify-content: center;
  align-items: center;
`;
