import styled from "styled-components/native";
import React from "react";
import { colors, MainHeading } from "../styles/styles";

interface Props {}

export default function BannedScreen({}: Props) {
  return (
    <Container>
      <MainHeading>정지된 계정입니다</MainHeading>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
  justify-content: center;
  align-items: center;
`;
