import styled from "styled-components/native";
import { colors, GeneralText } from "../../styles/styles";
import React from "react";

interface Props {
  isSelected?: boolean;
  tag: string;
  onPress: () => void;
}

export default function MySelectTag({
  isSelected = false,
  tag,
  onPress,
}: Props) {
  return (
    <Container onPress={onPress}>
      <Wrapper isSelected={isSelected}>
        <Text isSelected={isSelected}>{tag}</Text>
      </Wrapper>
    </Container>
  );
}

const Container = styled.TouchableOpacity``;

const Wrapper = styled.View<{ isSelected?: boolean }>`
  flex-direction: row;
`;

const Text = styled(GeneralText)<{ isSelected: boolean }>`
  border: 1px solid
    ${(props) => (props.isSelected ? colors.vividBlue : colors.bareGrey)};
  border-radius: 15px;
  padding: 4px;
  font-size: 16px;
  margin: 7px 2px;
  color: ${(props) => (props.isSelected ? colors.vividBlue : colors.bareGrey)};
`;
