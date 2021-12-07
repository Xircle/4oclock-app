import styled from "styled-components/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { colors, GeneralText } from "../../styles/styles";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  onPress: () => void;
}

export default function ReviewButton({ onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container>
        <Ionicons name="pencil" color={colors.lightBlack} size={17} />
        <Text>리뷰 쓰기</Text>
      </Container>
    </TouchableOpacity>
  );
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Text = styled(GeneralText)`
  color: ${colors.lightBlack};
  margin-left: 5px;
`;
