import styled from "styled-components/native";
import React from "react";
import { Dimensions } from "react-native";
import { colors, fontFamilies, GeneralText } from "../../styles/styles";

interface Props {
  onPress: (string) => void;
  selectedType: string;
}

const { width } = Dimensions.get("window");

const types = ["번개", "정기", "이벤트"];

export default function CreatePlaceTypeSelector({
  onPress,
  selectedType,
}: Props) {
  return (
    <Container>
      <Select onPress={() => onPress(types[0])}></Select>
      <Select onPress={() => onPress(types[1])}></Select>
      <Select onPress={() => onPress(types[2])}></Select>
    </Container>
  );
}

const Select = styled.TouchableOpacity`
  width: 100%;
  height: 85px;
  border-radius: 9px;
  background-color: #d9d9d9;
  margin-bottom: 18px;
`;

const Label = styled(GeneralText)``;

const Container = styled.View`
  width: ${width * 0.9 + "px"};
  height: 100%;
`;
