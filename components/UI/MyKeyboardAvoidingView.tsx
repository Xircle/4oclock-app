import styled from "styled-components/native";
import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export default function MyKeyboardAvoidingView({ children }: Props) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {children}
    </KeyboardAvoidingView>
  );
}
