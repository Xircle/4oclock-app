import styled from "styled-components/native";
import React from "react";
import { colors, Text } from "../styles/styles";

interface Props {}

export default function Chat(props: Props) {
  return (
    <Container>
      <Text>chat</Text>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.bgColor};
`;

