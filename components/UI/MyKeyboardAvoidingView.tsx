import styled from "styled-components/native";
import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { colors } from "../../styles/styles";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  keyboardVerticalOffset?: number;
}

export default function MyKeyboardAvoidingView({
  children,
  keyboardVerticalOffset,
}: Props) {
  if (keyboardVerticalOffset) {
    return (
      <Container
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        {children}
      </Container>
    );
  } else {
    return (
      <Container
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {children}
      </Container>
    );
  }
}

const Container = styled(KeyboardAvoidingView)`
  width: 100%;
  flex: 1;
  background-color: ${colors.white};
`;
