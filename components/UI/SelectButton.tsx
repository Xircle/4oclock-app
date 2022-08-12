import styled from "styled-components/native";
import React from "react";
import { colors, Text } from "../../styles/styles";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  size?: number;
  selected: boolean;
  marginRight?: number;
}

export default function SelectButton({ size, selected, marginRight }: Props) {
  return (
    <YKIconWrapper selected={selected} marginRight={marginRight}>
      <YKIconContainer>
        <Ionicons
          name="checkmark"
          size={size ? size * 0.85 : 25.5}
          color={colors.white}
        />
      </YKIconContainer>
    </YKIconWrapper>
  );
}

const YKIconWrapper = styled.View<{ selected?: boolean; marginRight: number }>`
  margin-right: ${(props) =>
    props.marginRight ? props.marginRight + "px" : 0 + "px"};
  background-color: ${(props) =>
    props.selected ? colors.vividBlue : colors.bareGrey};
  border-radius: ${(props) => (props.size ? props.size / 2 + "px" : "15px")};
  width: ${(props) => (props.size ? props.size + "px" : "30px")};
  height: ${(props) => (props.size ? props.size + "px" : "30px")};
  justify-content: center;
  align-items: center;
`;

const YKIconContainer = styled(Text)``;
