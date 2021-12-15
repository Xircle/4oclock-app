import styled from "styled-components/native";
import React from "react";
import { View } from "react-native";
import { colors, GreyInfoText, MainHeading, Text } from "../../styles/styles";
import { AuthAction } from "./types";
import { AuthState } from "./types.d";

interface Props {
  onNext: () => void;
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export default function AuthAgree({ onNext, state, dispatch }: Props) {
  return (
    <Container>
      <MainHeading style={{ marginTop: 40 }}>
        연고이팅 크루가{"\n"}된 걸 환영해🎉
      </MainHeading>
      <GreyInfoText style={{ marginTop: 20 }}>
        이제 친구들과 맛있는 밥먹으며 놀러가자!!!
      </GreyInfoText>
    </Container>
  );
}

const Container = styled.ScrollView`
  background-color: ${colors.bgColor};
  padding: 15px;
`;
