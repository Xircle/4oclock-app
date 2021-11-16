import styled from "styled-components/native";
import React from "react";
import XLButton, { ButtonText } from "../components/XLButton";
import {} from "react-native";

interface Props {}

export default function Main(props: Props) {
  return (
    <Container>
      <Text>Main</Text>
      <XLButton bgColor="#18A0FB" onPress={() => console.log("hi")}>
        <ButtonText>가입하기</ButtonText>
      </XLButton>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;
