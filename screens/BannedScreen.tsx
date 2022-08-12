import styled from "styled-components/native";
import React from "react";
import { colors, MainHeading, SubHeading } from "../styles/styles";

interface Props {}

export default function BannedScreen({}: Props) {
  return (
    <Container>
      <MainHeading>정지된 계정입니다</MainHeading>
      <SubHeading>
        관련문의는 케빈의 클럽 카카오 체널로 연락 주시면 답변드리겠습니다.
      </SubHeading>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
  justify-content: center;
  align-items: center;
`;
