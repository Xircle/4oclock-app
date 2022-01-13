import styled from "styled-components/native";
import { GeneralText } from "../../styles/styles";
import React from "react";

interface Props {}

export default function ChatRoom(props: Props) {
  return (
    <Container>
      <ToBeDeletedText>챗룸</ToBeDeletedText>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const ToBeDeletedText = styled(GeneralText)``;
