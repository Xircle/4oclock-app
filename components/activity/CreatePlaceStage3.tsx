import styled from "styled-components/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { GeneralText } from "../../styles/styles";

interface Props {
  cleanUp: () => void;
}

export default function CreatePlaceStage3({ cleanUp }: Props) {
  return (
    <Container>
      <CTAButton onPress={cleanUp}>
        <CTAButtonText>clean up</CTAButtonText>
      </CTAButton>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const CTAButton = styled.TouchableOpacity``;

const CTAButtonText = styled(GeneralText)``;
