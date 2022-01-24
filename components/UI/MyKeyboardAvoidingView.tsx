import styled from "styled-components/native";
import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        {children}
      </KeyboardAvoidingView>
    );
  } else {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {children}
      </KeyboardAvoidingView>
    );
  }
}
