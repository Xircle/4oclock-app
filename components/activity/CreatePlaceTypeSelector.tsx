import styled from "styled-components/native";
import React from "react";
import { Dimensions } from "react-native";
import { colors, fontFamilies, GeneralText } from "../../styles/styles";

interface Props {
  onPress: (string) => void;
  selectedType: string;
}

const { width } = Dimensions.get("window");

const types = [ "번개", "이벤트", '정기'];

export default function CreatePlaceTypeSelector({
  onPress,
  selectedType,
}: Props) {
  return (
    <Container>
      {types.map((item, idx) => {
        return (
          <Select key={item} onPress={() => onPress(types[idx])}>
            <SelectText selected={selectedType === types[idx]}>
              {item}
            </SelectText>
          </Select>
        );
      })}
    </Container>
  );
}

const Container = styled.View`
  width: ${width * 0.9 + "px"};
  height: 30px;
  border-radius: 5px;
  flex-direction: row;
  justify-content: space-around;
`;

const Select = styled.TouchableOpacity<{ backgroundColor: string }>`
  justify-content: center;
  align-items: center;
`;

const SelectText = styled(GeneralText)<{ selected: boolean }>`
  color: ${(props) => (props.selected ? colors.mainBlue : colors.bareGrey)};
  font-family: ${fontFamilies.bold};
  padding: 3px 10px;
  border: 1px solid
    ${(props) => (props.selected ? colors.mainBlue : colors.bareGrey)};
  border-radius: 14px;
`;
