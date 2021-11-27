import styled from "styled-components/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import {
  colors,
  GeneralText,
  MainHeading,
  SubHeading,
} from "../../styles/styles";

interface Props {
  cleanUp: () => void;
}

export default function CreatePlaceStage3({ cleanUp }: Props) {
  return (
    <Container>
      <MainHeading>성공적으로 열렸어!</MainHeading>
      <SubHeading style={{ marginTop: 20, marginBottom: 20 }}>
        정보정보정보정보
      </SubHeading>
      <CTAButton onPress={cleanUp}>
        <CTAButtonText>또 다른 모임 생성하기</CTAButtonText>
      </CTAButton>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CTAButton = styled.TouchableOpacity`
  background-color: ${colors.mainBlue};
  padding: 14px;
  border-radius: 5px;
`;

const CTAButtonText = styled(GeneralText)`
  color: ${colors.bgColor};
`;
