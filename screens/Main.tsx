import styled from "styled-components/native";
import React, { useEffect } from "react";
import {} from "react-native";
import { colors } from "../styles/styles";
import { useDB } from "../lib/RealmDB";
import { TOKEN } from "../lib/utils";

interface Props {}

export default function Main(props: Props) {
  const realm = useDB();

  return (
    <Container>
      <Text>Main {TOKEN}</Text>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;
