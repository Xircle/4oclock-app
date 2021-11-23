import styled from "styled-components/native";
import React from "react";
import { Text } from "../styles/styles";

interface Props {}

export default function SignIn({ route }: Props) {
  console.log(route);
  return (
    <Container>
      <Text>{route.params.gender}</Text>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
