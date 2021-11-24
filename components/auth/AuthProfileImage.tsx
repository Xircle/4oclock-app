import styled from "styled-components/native";
import React from "react";
import { View } from "react-native";
import { colors, Text } from "../../styles/styles";
import { AuthAction, AuthState } from "./types.d";

interface Props {
  onNext: () => void;
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export default function AuthProfileImage({ onNext, state, dispatch }: Props) {
  return (
    <Container>
      <Text>4</Text>
    </Container>
  );
}

const Container = styled.ScrollView`
  background-color: ${colors.bgColor};
  padding: 15px;
`;
