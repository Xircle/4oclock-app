import styled from "styled-components/native";
import React from "react";
import { colors, fontFamilies, GeneralText } from "../../styles/styles";
import { Dimensions, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TabIcon from "./TabIcon";

interface Props {
  focused: boolean;
}

const { width } = Dimensions.get("window");

export default function TabMiddleAdd({ focused }: Props) {
  return (
    <Ionicons
      name={focused ? "add-circle" : "add-circle-outline"}
      color={focused ? colors.mainBlue : colors.bareGrey}
      size={25}
    />
  );
}

const Container = styled.View<{ width: number; focused: boolean }>`
  height: 40px;
  width: 40px;
  border-radius: 40px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.focused ? colors.mainBlue : colors.bareGrey};
`;

const Label = styled(GeneralText)`
  color: ${colors.bgColor};
`;

const Wrapper = styled.View`
  margin: auto;
`;
