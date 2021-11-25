import styled from "styled-components/native";
import React from "react";
import { GeneralText } from "../../styles/styles";
import { Dimensions } from "react-native";

interface Props {
  title: string;
  color: string;
  focused: boolean;
  size?: number;
}

const { width } = Dimensions.get("window");

export default function TabSide({ title, color, focused, size }: Props) {

  return (
    <Text width={width} color={color}>
      {title}
    </Text>
  );
}

const Text = styled(GeneralText)<{ width: number; color: string }>`
  font-size: ${(props) => props.width * 0.04 + "px"};
  color: ${(props) => props.color};
`;
