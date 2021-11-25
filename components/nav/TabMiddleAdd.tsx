import styled from "styled-components/native";
import React from "react";
import { colors, fontFamilies, GeneralText } from "../../styles/styles";
import { Dimensions, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TabIcon from "./TabIcon";

interface Props {}

const { width } = Dimensions.get("window");

export default function TabMiddleAdd(props: Props) {
  return (
    <Container style={{ transform: [{ translateY: -18 }] }} width={width}>
      {/* <Ionicons name="add-circle" color={colors.mainBlue} size={width} /> */}
      <BigLabel>+</BigLabel>
      <Label>개설</Label>
    </Container>
  );
}

const Container = styled.View<{ width: number }>`
  height: 80px;
  width: 80px;
  border-radius: 40px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.mainBlue};
`;

const Label = styled(GeneralText)`
  color: ${colors.bgColor};
  transform: translateY(-15px);
`;

const BigLabel = styled(Label)`
  font-size: 55px;
  font-family: ${fontFamilies.bold};
  transform: translateY(0px);
`;
