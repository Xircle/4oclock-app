import styled from "styled-components/native";
import React from "react";
import { ActivityIndicator } from "react-native";

interface Props {
  large?: boolean;
  color?: string;
}

export default function Loader({ large, color }: Props) {
  return (
    <Wrapper>
      {color ? (
        <ActivityIndicator size={large ? "large" : "small"} color={color} />
      ) : (
        <ActivityIndicator size={large ? "large" : "small"} />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
