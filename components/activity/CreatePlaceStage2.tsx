import styled from "styled-components/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import MyBackButton from "../UI/MyBackButton";
import { colors } from "../../styles/styles";

interface Props {
  onBackPressed: () => void;
}

export default function CreatePlaceStage2({ onBackPressed }: Props) {
  return (
    <Container>
      <TouchableOpacity onPress={onBackPressed}>
        <MyBackButton color={colors.black} />
      </TouchableOpacity>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;
