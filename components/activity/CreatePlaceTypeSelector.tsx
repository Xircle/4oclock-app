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
      <Select
        onPress={() => onPress(types[0])}
        selected={selectedType === types[0]}
      >
        <Label>미B행 번개모임 열기 ⭐️</Label>
        <SubLabel selected={selectedType === types[0]}>
          누구든 열 수 있고, 새로운 친구들과 놀고 싶을 때 놀러가자!
        </SubLabel>
      </Select>
      <Select
        onPress={() => onPress(types[1])}
        selected={selectedType === types[1]}
      >
        <Label>미B행 정기모임 열기 👽</Label>
        <SubLabel selected={selectedType === types[1]}>
          리더가 여는 미b행의 컨텐츠로 꿀잼 비행모임
        </SubLabel>
      </Select>
      <Select
        onPress={() => onPress(types[2])}
        selected={selectedType === types[2]}
      >
        <Label>미B행 파티 열기 🔥️</Label>
        <SubLabel selected={selectedType === types[2]}>
          운영진만 열 수 있어요!
        </SubLabel>
      </Select>
    </Container>
  );
}

const Select = styled.TouchableOpacity<{ selected: boolean }>`
  width: 100%;
  height: 85px;
  border-radius: 9px;
  background-color: ${(props) =>
    props.selected ? colors.mainBlue : "#ebebeb"};
  margin-bottom: 18px;
  padding: 11px;
  padding-top: 16px;
  padding-bottom: 16px;
  justify-content: space-between;
`;

const Label = styled(GeneralText)`
  font-family: ${fontFamilies.bold};
`;

const SubLabel = styled(GeneralText)<{ selected: boolean }>`
  font-size: 10px;
  color: ${(props) => (props.selected ? colors.bgColor : "#959595")};
`;

const Container = styled.View`
  width: ${width * 0.9 + "px"};
  height: 100%;
`;
