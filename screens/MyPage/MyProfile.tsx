import styled from "styled-components/native";
import React from "react";
import { colors } from "../../styles/styles";

interface Props {}

export default function MyProfile(props: Props) {
  return (
    <Container>
      <Text>MyProfile</Text>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.bgColor};
`;

const Text = styled.Text``;
