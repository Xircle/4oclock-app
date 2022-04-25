import styled from "styled-components/native";
import React from "react";
import { MainHeading } from "../../../styles/styles";
import { TouchableOpacity } from "react-native";

interface Props {}

export default function CreateActivityStack3(props: Props) {
  return (
    <Container>
      <TouchableOpacity>
        <MainHeading>스택 3</MainHeading>
      </TouchableOpacity>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;
