import styled from "styled-components/native";
import React from "react";
import { GeneralText } from "../../styles/styles";

interface Props {}

export default function Activity(props: Props) {
  return (
    <Container>
      <GeneralText>Activity</GeneralText>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;
